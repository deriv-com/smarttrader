import React from 'react';
import { CashierNote } from './index.jsx';
import { Table } from '../../_common/components/elements.jsx';

const Button = ({ url, real, className, text }) => (
    <a href={it.url_for(url)} className={`toggle button ${real ? 'client_real' : 'client_logged_out'} invisible ${className || undefined}`}>
        <span>{text}</span>
    </a>
);

const TableTitle = ({ title, className, dataShow, dataAnchor }) => (
    <h3 className={`gr-padding-10${className ? ` ${className}` : ''}`} data-show={dataShow} data-anchor={dataAnchor}>{title}</h3>
);

const PaymentLogo = ({ logo }) => (
    <img src={it.url_for(`images/pages/home/payment/${ logo }.svg`)} />
);

const TableValues = ({ value }) => {
    const values = Array.isArray(value) ? value : [value];
    return (
        <React.Fragment>
            { values.reduce((arr, e, inx) => arr === null ? [e] : [...arr, <br key={inx} />, e], null) }
        </React.Fragment>
    );
};

const ReferenceLink = ({ href, className = '', title = '' }) => (
    <a
        className={`payment-methods__reference ${className}`}
        href={href}
        target='_blank'
        aria-disabled={!href}
        title={title}
        rel='noopener noreferrer'
    />
);

const ReferenceLinks = ({ pdf_file, video_link }) => (
    <React.Fragment>
        {!pdf_file && !video_link && <span>&mdash;</span>}
        {pdf_file && <ReferenceLink
            className='payment-methods__reference-pdf'
            href={pdf_file && it.url_for(`download/payment/${pdf_file}`)}
            title={pdf_file}
        />}
        {video_link && <ReferenceLink
            className='payment-methods__reference-video'
            href={video_link}
            title={it.L('Video tutorial')}
        />}
    </React.Fragment>
);

const CustomTableHead = ({ data }) => (
    <React.Fragment>
        {data.map((item, index) => (
            <span key={index} className='th'>{item.text}</span>
        ))}
    </React.Fragment>
);

const CustomTableData = ({ data }) => (
    <React.Fragment>
        {data.map((item, index) => (
            <div key={index} className={item.td ? 'td-description' : 'td-list active'}>
                {item.td && <span className='td'>{item.td}</span>}
                {item.td_list &&
                    item.td_list.map((td, inx_td) => (
                        <p className='td' key={inx_td}>{td.text}</p>
                    ))
                }
            </div>
        ))}
    </React.Fragment>
);

const PaymentMethods = () => {
    const head = [
        { text: it.L('Method') },
        { attributes: { colSpan: 5, className: 'th-list' }, custom_th : <CustomTableHead data={[
            { text: it.L('Currencies') },
            { text: it.L('Min-Max Deposit') },
            { text: it.L('Min-Max Withdrawal') },
            { text: `${it.L('Processing Time')}*` },
            { text: it.L('Reference') },
        ]}
        />,
        },
    ];

    const deposit                  = 'Deposit: ';
    const withdrawal               = 'Withdrawal: ';
    const working_day              = '[_1] working day';
    const instant                  = 'Instant';
    const working_day_range        = '[_1] to [_2] working days';
    const not_applicable           = 'Not applicable';
    const blockchain_confirmations = '[_1] blockchain confirmations';

    const createLink = (href) => (`<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>`);

    return (
        <div id='cashier-content'>
            <h1>{it.L('Available payment methods')}</h1>

            <p className='pm-description'>{it.L('This is a complete list of supported payment methods. We\'ll show you which payment methods are available in your location on the deposit page.')}</p>
            <CashierNote className='gr-parent' text={it.L('Please do not share your bank account, credit card, or e-wallet with another client, as this may cause delays in your withdrawals.')} />
            <div className='center-text'>
                <p>
                    <Button url='new-account' text={it.L('Open an account now')} />
                    <Button url='cashier/forwardws?action=deposit'  real className='deposit'  text={it.L('Deposit')} />
                    <Button url='cashier/forwardws?action=withdraw' real className='withdraw' text={it.L('Withdraw')} />
                </p>
            </div>

            <div id='payment_methods' className='table-container'>
                <TableTitle title={it.L('Bank wire/Money transfer')} className='no-margin' dataAnchor='bank' />
                <Table
                    data={{
                        thead: [ head ],
                        tbody: [
                            {
                                id : 'bank-transfer',
                                row: [
                                    { text: <PaymentLogo logo='bank_transfer' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Deposit and withdraw your funds via international bank wire transfer.') },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '500 - 100,000' },
                                            { text: '500 - 100,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${working_day}`, 1), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id      : 'paytrust',
                                dataShow: '-eucountry',
                                row     : [
                                    { text: <PaymentLogo logo='paytrust' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Paytrust88 is a payment facility that allows online bank transfers for clients across Southeast Asia. For more information, please visit [_1].', '<a href="https://paytrust88.com/" target="_blank">paytrust88.com</a>') },
                                        { td_list: [
                                            { text: 'USD' },
                                            { text: '25 - 10,000' },
                                            { text: 'N/A' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${not_applicable}`)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },

                                ],
                            },
                            {
                                id : 'zing-pay',
                                row: [
                                    { text: <PaymentLogo logo='zingpay' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('ZingPay is a payment facility that allows online bank transfers for clients in South Africa.') },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '10 - 10,000' },
                                            { text: '10 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day_range}`, 1, 3)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'help-2-pay',
                                row: [
                                    { text: <PaymentLogo logo='help2pay' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Help2Pay is a payment facility that allows online bank transfers for clients across Southeast Asia.') },
                                        { td_list: [
                                            { text: 'USD' },
                                            { text: '10 - 10,000' },
                                            { text: 'N/A' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${not_applicable}`)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'dragon-pheonix',
                                row: [
                                    { text: <PaymentLogo logo='dragon_pheonix' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('DragonPhoenix is a payment facility that allows online bank transfers for clients across Southeast Asia.') },
                                        { td_list: [
                                            { text: 'USD' },
                                            { text: '10 - 10,000' },
                                            { text: 'N/A' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${not_applicable}`)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                        ],
                    }}
                />

                <TableTitle title={it.L('Credit/Debit Card')} dataAnchor='credit_debit' />
                <Table
                    data={{
                        thead: [ head ],
                        tbody: [
                            {
                                id : 'visa',
                                row: [
                                    { text: <PaymentLogo logo='visa' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Visa is an international company that supports digital payments around the world, most commonly through their brand of credit and debit cards. For more information, please visit [_1].', `${createLink('http://visa.com')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '10 - 10,000' },
                                            { text: '10 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Credit_Debit.pdf' */ video_link='https://youtu.be/n_qQbML_qAI' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'mastercard',
                                row: [
                                    { text: <PaymentLogo logo='mastercard' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Mastercard is an international company that processes payments made with Mastercard-branded credit and debit cards. For more information, please visit [_1].', `${createLink('https://www.mastercard.us')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '10 - 10,000' },
                                            { text: '10 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Credit_Debit.pdf' */ video_link='https://youtu.be/n_qQbML_qAI' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'maestro',
                                row: [
                                    { text: <PaymentLogo logo='maestro' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Maestro is an international debit card service by Mastercard. For more information, please visit [_1].', `${createLink('https://brand.mastercard.com/brandcenter/more-about-our-brands.html')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '10 - 10,000' },
                                            { text: '10 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                        ],
                    }}
                />

                <div className='gr-padding-10'>
                    <p className='hint'>{it.L('Note:')} {it.L('Mastercard and Maestro withdrawals are only available for UK Clients.')}</p>
                </div>

                <TableTitle title={it.L('E-wallet')} dataAnchor='ewallet' />
                <Table
                    data={{
                        thead: [ head ],
                        tbody: [
                            {
                                id      : 'fasapay',
                                dataShow: '-eucountry',
                                row     : [
                                    { text: <PaymentLogo logo='fasapay' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('FasaPay enables electronic money transfers for individuals and payment gateways for merchants. For more information, please visit [_1].', `${createLink('https://www.fasapay.com')}`) },
                                        { td_list: [
                                            { text: 'USD' },
                                            { text: '5 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_Fasapay.pdf' video_link='https://youtu.be/PTHLbIRLP58' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id      : 'perfect-money',
                                dataShow: '-eucountry',
                                row     : [
                                    { text: <PaymentLogo logo='perfect_money' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Perfect Money allows individuals to make instant payments and money transfers securely on the Internet. For more information, please visit [_1].', `${createLink('https://perfectmoney.is')}`) },
                                        { td_list: [
                                            { text: 'USD EUR' },
                                            { text: '5 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_PerfectMoney.pdf' video_link='https://youtu.be/fBt71VBp2Pw' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'skrill',
                                row: [
                                    { text: <PaymentLogo logo='skrill' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Skrill offers global payment solutions for individuals who wish to deposit funds, shop online, and transfer money to family and friends. For more information, please visit [_1].', `${createLink('https://www.skrill.com')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '10 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_Skrill.pdf' video_link='https://youtu.be/pQDVDC-mWuA' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'neteller',
                                row: [
                                    { text: <PaymentLogo logo='neteller' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('NETELLER provides businesses and individuals with a fast, simple, and secure way to transfer money online. For more information, please visit [_1].', `${createLink('https://www.neteller.com')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '5 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_Neteller.pdf' video_link='https://youtu.be/uHjRXzMQ8FY' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'webmoney',
                                row: [
                                    { text: <PaymentLogo logo='webmoney' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('WebMoney is an online payment settlement system that\'s been operating since 1998. For more information, please visit [_1].', `${createLink('https://www.wmtransfer.com')}`) },
                                        { td_list: [
                                            { text: 'USD EUR' },
                                            { text: '5 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_WebMoney.pdf' video_link='https://youtu.be/e0THC3c-fEE' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id      : 'qiwi',
                                dataShow: '-eucountry',
                                row     : [
                                    { text: <PaymentLogo logo='qiwi' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Qiwi is a payment service provider that was founded in 2007. It provides individuals with a simple way to transfer money, receive payments, and pay online. For more information, please visit [_1].', `${createLink('https://qiwi.com')}`) },
                                        { td_list: [
                                            { text: 'USD EUR' },
                                            { text: <TableValues value={['5 - 200 (USD)', '5 - 150 (EUR)']} /> },
                                            { text: <TableValues value={['5 - 180 (USD)', '5 - 150 (EUR)']} /> },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_Qiwi.pdf' video_link='https://youtu.be/CMAF29cn9XQ' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'paysafe',
                                row: [
                                    { text: <PaymentLogo logo='paysafe' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('paysafecard offers a voucher-based online payment method that does not require a bank account, credit card, or other personal information. For more information, please visit [_1].', `${createLink('https://www.paysafecard.com')}`) },
                                        { td_list: [
                                            { text: 'USD GBP EUR AUD' },
                                            { text: '5 - 1,000' },
                                            { text: '5 - 750' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks pdf_file='Binary.com_PaySafeCard.pdf' video_link='https://youtu.be/5QzGc1nleQo' /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'jeton',
                                row: [
                                    { text: <PaymentLogo logo='jeton' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Jeton is an international e-wallet for money transfers and online payments. For more information, please visit [_1].', '<a href="https://www.jeton.com/" target="_blank">www.jeton.com</a>') },
                                        { td_list: [
                                            { text: 'USD EUR' },
                                            { text: '5 - 10,000' },
                                            { text: 'N/A' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'sticpay',
                                row: [
                                    { text: <PaymentLogo logo='sticpay' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Sticpay is a global e-wallet service for money transfers and online payments. For more information, please visit [_1].', '<a href="https://www.sticpay.com" target="_blank">https://www.sticpay.com</a>') },
                                        { td_list: [
                                            { text: 'USD GBP EUR' },
                                            { text: '5 - 10,000' },
                                            { text: '5 - 10,000' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'airtm',
                                row: [
                                    { text: <PaymentLogo logo='airtm' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Airtm is a global e-wallet service for money transfers and online payments. For more information, please visit [_1].', '<a href="https://www.airtm.io/#/" target="_blank">https://www.airtm.io</a>') },
                                        { td_list: [
                                            { text: 'USD' },
                                            { text: '5 - 2,500' },
                                            { text: '5 - 2,500' },
                                            { text: <TableValues value={[it.L(`${deposit}${instant}`), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                        ],
                    }}
                />
                <TableTitle
                    dataShow='-eucountry'
                    title={it.L('Cryptocurrencies')}
                    withdrawal={it.L('Min Withdrawal')}
                    dataAnchor='cryptocurrency'
                />
                <Table
                    id='cryptocurrency'
                    dataShow='-eucountry'
                    data={{
                        thead: [
                            [
                                { text: it.L('Method') },
                                { attributes: { colSpan: 5, className: 'th-list' }, custom_th : <CustomTableHead data={[
                                    { text: it.L('Currencies') },
                                    { text: it.L('Min Deposit') },
                                    { text: it.L('Min Withdrawal') },
                                    { text: `${it.L('Processing Time')}*` },
                                    { text: it.L('Reference') },
                                ]}
                                />,
                                },
                            ],
                        ],
                        tbody: [
                            {
                                id : 'bitcoin',
                                row: [
                                    { text: <PaymentLogo logo='bitcoin' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Bitcoin is the world\'s first decentralised cryptocurrency, created in 2009. For more information, please visit [_1].', `${createLink('https://bitcoin.org')}`) },
                                        { td_list: [
                                            { text: 'BTC' },
                                            { text: '—' },
                                            { text: <span data-currency='BTC' /> },
                                            { text: <TableValues value={[it.L(`${deposit}${blockchain_confirmations}`, 3), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Bitcoin.pdf' video_link='https://youtu.be/StIW7CviBTw' */ /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'usdc',
                                row: [
                                    { text: <PaymentLogo logo='usdc' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('For more information, please visit [_1].', `${createLink('https://www.centre.io/usdc')}`) },
                                        { td_list: [
                                            { text: 'USDC' },
                                            { text: '—' },
                                            { text: <span data-currency='USDC' /> },
                                            { text: <TableValues value={[it.L(`${deposit}${blockchain_confirmations}`, 3), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: '—' },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'ethereum-black',
                                row: [
                                    { text: <PaymentLogo logo='ethereum_black' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Ether is a cryptocurrency that is used to pay for transactions on the Ethereum platform. For more information, please visit [_1].', `${createLink('https://www.ethereum.org')}`) },
                                        { td_list: [
                                            { text: 'ETH' },
                                            { text: '—' },
                                            { text: <span data-currency='ETH' /> },
                                            { text: <TableValues value={[it.L(`${deposit}${blockchain_confirmations}`, 3), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Ethereum.pdf' video_link='https://youtu.be/B7EVLt3lIMs' */ /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'litecoin',
                                row: [
                                    { text: <PaymentLogo logo='litecoin' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Litecoin is a cryptocurrency similar to Bitcoin, but capable of a higher transaction volume and faster confirmation times. For more information, please visit [_1].', `${createLink('https://www.litecoin.org')}`) },
                                        { td_list: [
                                            { text: 'LTC' },
                                            { text: '—' },
                                            { text: <span data-currency='LTC' /> },
                                            { text: <TableValues value={[it.L(`${deposit}${blockchain_confirmations}`, 3), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Litecoin.pdf' video_link='https://youtu.be/DJhP5UjKPpI' */ /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                            {
                                id : 'tether',
                                row: [
                                    { text: <PaymentLogo logo='tether' /> },
                                    { attributes: { colSpan: 5, className: 'toggler' }, custom_td : <CustomTableData data={[
                                        { td: it.L('Tether is a blockchain-based cryptocurrency whose cryptocoins in circulation are backed by an equivalent amount of traditional fiat currencies. For more information, please visit [_1].', `${createLink('https://www.tether.to')}`) },
                                        { td_list: [
                                            { text: 'USDT' },
                                            { text: '—' },
                                            { text: <span data-currency='UST' /> },
                                            { text: <TableValues value={[it.L(`${deposit}${blockchain_confirmations}`, 3), it.L(`${withdrawal}${working_day}`, 1)]} /> },
                                            { text: <ReferenceLinks /* pdf_file='Binary.com_Tether.pdf' video_link='https://youtu.be/N1WPsq67290' */ /> },
                                        ],
                                        },
                                    ]}
                                    />,
                                    },
                                ],
                            },
                        ],
                    }}
                />

                <div className='gr-padding-10' data-show='-eucountry'>
                    <p className='hint'>{it.L('Note:')} {it.L('Figures have been rounded.')}</p>
                </div>
            </div>

            <div className='gr-padding-10'>
                <p className='hint'>{it.L('Note:')}</p>
                <ol>
                    <li className='hint' data-show='-eucountry'>{it.L('The minimum amount for withdrawal will vary depending on the latest exchange rates.')}</li>
                    <li className='hint'>{it.L('Additional processing time may be required by your bank or money transfer services for the funds to be credited to your payment account.')}</li>
                </ol>
            </div>
        </div>
    );
};

export default PaymentMethods;
