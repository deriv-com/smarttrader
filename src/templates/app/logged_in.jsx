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

                #login_loading {
                    width: 100vw;
                    height: 100vh;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    display: flex;
                    background: transparent;
                }

                /* Barspinner styles */
                .barspinner {
                    margin: auto;
                    width: 60px;
                    height: 20px;
                    white-space: nowrap;
                }

                .barspinner__rect {
                    margin: 4px;
                    border-radius: 20px;
                    height: 60%;
                    width: 6px;
                    display: inline-block;
                    background-color: #9ab4b6;
                    animation: sk-stretchdelay 1.2s infinite ease-in-out;
                }

                /* Individual animation delays for staggered effect */
                .barspinner__rect--1 {
                    animation-delay: -1.1s;
                    margin: 4px !important;
                    height: 60% !important;
                }

                .barspinner__rect--2 {
                    animation-delay: -1.0s;
                    margin: 4px !important;
                    height: 60% !important;
                }

                .barspinner__rect--3 {
                    animation-delay: -0.9s;
                    margin: 4px !important;
                    height: 60% !important;
                }

                .barspinner__rect--4 {
                    animation-delay: -0.8s;
                    margin: 4px !important;
                    height: 60% !important;
                }

                .barspinner__rect--5 {
                    animation-delay: -0.7s;
                    margin: 4px !important;
                    height: 60% !important;
                }

                .initial-loader__barspinner {
                    margin: 50px auto;
                }

                .initial-loader__barspinner--rect {
                    background-color: #9ab4b6;
                }

                /* Keyframe animation for the stretch effect */
                @keyframes sk-stretchdelay {
                    0%,
                    40%,
                    100% {
                        transform: scaleY(1);
                    }
                    20% {
                        transform: scaleY(2);
                    }
                }

                /* Specific styles for logged in loading */
                #logged_in_loading {
                    position: absolute;
                    bottom: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    margin: 0;
                }

                #logged_in_loading .barspinner__rect {
                    background-color: #9ab4b6;
                }

                #content-holder {
                    height: 100vh;
                    background-repeat: no-repeat;
                    background-position: center;
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
