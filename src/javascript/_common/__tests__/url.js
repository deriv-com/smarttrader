const { expect, setURL } = require('./tests_common');
const Url                = require('../url');

const urls = [
    'https://www.binary.com',
    'https://www.binary.me',
    'https://www.deriv.com',
];

describe('Url', () => {
    urls.forEach(url => {
        describe(url, () => {
            runTests(url);
        });
    });
});

function runTests(url) {
    setURL(url);
    const website_url  = Url.websiteUrl();
    const language     = 'en';
    const query_string = 'market=forex&duration_amount=5&no_value=';
    const params_obj   = { market: 'forex', duration_amount: '5', no_value: '' };
    const url_no_qs    = `${website_url}${language}/trading.html`;
    const url_with_qs  = `${url_no_qs}?${query_string}`;
    const trading_url  = `${website_url}${language}/trading.html`;

    describe('.paramsHash()', () => {
        it('returns correct object', () => {
            expect(Url.paramsHash(url_with_qs)).to.be.an('Object')
                .and.to.have.all.keys('market', 'duration_amount', 'no_value')
                .and.to.deep.equal(params_obj);
        });
        it('returns empty object when there is no query string', () => {
            expect(Url.paramsHash(url_no_qs)).to.be.an('Object')
                .and.to.deep.equal({});
            expect(Url.paramsHash(`${url_no_qs}?`)).to.be.an('Object')
                .and.to.deep.equal({});
            setURL(url_no_qs);
            expect(Url.paramsHash()).to.deep.eq({});
        });
    });

    describe('.getLocation()', () => {
        it('works as expected', () => {
            expect(Url.getLocation().hostname).to.eq(url.replace(/^https:\/\//, ''));
        });
    });

    describe('.paramsHashToString()', () => {
        it('returns an empty string if empty object or undefined passed', () => {
            expect(Url.paramsHashToString({})).to.eq('');
            expect(Url.paramsHashToString()).to.eq('');
        });
        it('returns the expected conversion of object to string', () => {
            expect(Url.paramsHashToString(params_obj)).to.eq(query_string);
        });
    });

    describe('.urlFor()', () => {
        it('returns trading as default', () => {
            [undefined, null, '', '/', 'trading'].forEach((path) => {
                expect(Url.urlFor(path)).to.eq(trading_url);
            });
        });
        it('accepts params', () => {
            expect(Url.urlFor('trading', query_string)).to.eq(url_with_qs);
        });
        it('returns the correct language', () => {
            expect(Url.urlFor('home', undefined, 'es')).to.eq(`${website_url}es/home.html`);
        });
        it('ignores invalid characters', () => {
            expect(Url.urlFor('`~!@#$%^&*)(=+\[}{\]\\\"\';:\?><,|')).to.eq(trading_url);
        });
    });

    if (!/binary.com/.test(url)) {
        describe('.urlForCurrentDomain()', () => {
            const path_query_hash = 'path/to/file.html?q=value&n=1#hash';

            it('updates domain correctly', () => {
                expect(Url.urlForCurrentDomain('https://www.binary.com/')).to.eq(`${url}/`);
                expect(Url.urlForCurrentDomain(`https://www.binary.com/${path_query_hash}`)).to.eq(`${url}/${path_query_hash}`);
            });
            it('updates host maps correctly', () => {
                const host_map = Url.getHostMap();
                Object.keys(host_map).forEach(host => {
                    expect(Url.urlForCurrentDomain(`https://${host}/`)).to.eq(`https://${host_map[host]}/`);
                    expect(Url.urlForCurrentDomain(`https://${host}/${path_query_hash}`)).to.eq(`https://${host_map[host]}/${path_query_hash}`);
                });
            });
            it('doesn\'t update email links', () => {
                ['mailto:partners@binary.com', 'mailto:email@otherdomain.com'].forEach(email_link => {
                    expect(Url.urlForCurrentDomain(email_link)).to.eq(email_link);
                });
            });
            it('doesn\'t update the third party domains', () => {
                expect(Url.urlForCurrentDomain('https://www.otherdomain.com')).to.eq('https://www.otherdomain.com');
                expect(Url.urlForCurrentDomain('https://www.otherdomain.com/')).to.eq('https://www.otherdomain.com/');
                expect(Url.urlForCurrentDomain('https://subdomain.otherdomain.com/')).to.eq('https://subdomain.otherdomain.com/');
                expect(Url.urlForCurrentDomain('mailto:email@otherdomain.com')).to.eq('mailto:email@otherdomain.com');
            });
            it('doesn\'t update when current domain is not supported', () => {
                setURL('https://user.github.io/');
                ['https://www.binary.com', 'https://www.binary.com/', 'https://bot.binary.com', 'mailto:partners@binary.com'].forEach(u => {
                    expect(Url.urlForCurrentDomain(u)).to.eq(u);
                });
                setURL(url); // reset for the next test
            });
        });
    }

    describe('.urlForStatic()', () => {
        before(() => {
            Url.resetStaticHost();
        });

        it('returns base path as default', () => {
            expect(Url.urlForStatic()).to.eq(website_url);
        });
        it('returns expected path', () => {
            expect(Url.urlForStatic('images/common/plus.svg')).to.eq(`${website_url}images/common/plus.svg`);
        });
    });

    describe('.param()', () => {
        it('returns undefined if no match', () => {
            setURL(url_with_qs);
            expect(Url.param()).to.eq(undefined);
        });
        it('returns expected parameter', () => {
            expect(Url.param('duration_amount')).to.be.a('string').and.eq('5');
            expect(Url.param('no_value')).to.be.a('string').and.eq('');
        });
    });

    describe('.websiteUrl()', () => {
        it('returns expected value', () => {
            expect(website_url).to.eq(`${url}/`);
        });
    });
}
