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
                // #header-binary {height: 55px; background: #2a3052; border-bottom: 4px solid #e98024; text-align: center; padding: 10px 0;}
                // #header-binary a {margin: 0 auto; vertical-align: middle; display: inline-block; min-width: 220px;}
                // #header-binary #symbol-logo {vertical-align: middle; height: 55px;}
                // #header-binary #type-logo {vertical-align: middle; height: 37px; margin-left: 6px;}
                // #login_loading {text-align: center; padding-top: 90px;}
                #logged_in_loading .barspinner__rect {
                    background-color: #9ab4b6;
                }
                #content-holder {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
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
                <Loading id='logged_in_loading' />
            </div>
        </body>
    </html>
);

export default LoggedIn;
