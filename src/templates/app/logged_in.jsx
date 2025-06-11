import React from 'react';
import Loading from '../_common/components/loading.jsx';
import AntiClickjack from '../_common/includes/anti_clickjack.jsx';

const LoggedIn = () => (
    <html>
        <head>
            <AntiClickjack />
            { it.js_files.map((js_file, inx) => (
                <script key={inx} src={js_file.replace('{PLACEHOLDER_FOR_LANG}', it.language.toLowerCase())} />
            ))}
            <style>{`
                body {margin: 0;}
            `}
            </style>
            <link href='https://style.binary.com/binary.css' rel='stylesheet' />
            <meta name='referrer' content='origin' />
        </head>
        <body>
            {/* <div id='header-binary'>
                <a href={it.url_for('/')}>
                    <img id='symbol-logo' src={it.url_for('images/logo/symbol.svg')} alt='' />
                    <img id='type-logo' src={it.url_for('images/logo/type.svg')} alt='Binary.com' />
                </a>
            </div> */}
            <div id='content-holder'>
                <div id='content'>
                    <div id='login_loading'>
                        <a href={it.url_for('/')} id='loading_link'>
                            <Loading id='logged_in_loading' />
                        </a>
                    </div>
                </div>
            </div>
        </body>
    </html>
);

export default LoggedIn;
