import React from 'react';
import Head from './head.jsx';
import Header from './header.jsx';
// import MobileMenu from './mobile_menu.jsx';
import WalletHeader from './wallet-header.jsx';
// import Elevio from '../includes/elevio.jsx';
import Gtm from '../includes/gtm.jsx';
import LanguageMenuModal from '../components/language-menu-modal.jsx';

const CONTENT_PLACEHOLDER = 'CONTENT_PLACEHOLDER';

const WithLayout = ({ children }) => {
    const content_class = `${it.current_route || ''}-content`;
    return (
        <div id='content' className={it.current_route ? content_class : undefined}>
            <div id='page_info' style={{ display: 'none' }}>
                <div id='content_class'>{content_class}</div>
            </div>
            {it.layout !== 'full_width' ?
                <div className='container'>
                    {children}
                </div> :
                children
            }
        </div>
    );
};

const InnerContent = () => (
    it.layout ?
        <WithLayout> {CONTENT_PLACEHOLDER} </WithLayout>
        : CONTENT_PLACEHOLDER
);

const Topbar = () => (
    <div className='no-print primary-bg-color-dark topbar mobile-hide'>
        <div id='topbar-info'>
            <div id='network_status_wrapper' className='no-underline' data-balloon-pos='up'>
                <div className='network_status' />
            </div>
            <div id='language-select'><img id='language-select__logo' /></div>
            <span className='no-underline nowrap gmt-clock' data-balloon-pos='up' />
            <div id='topbar-whatsapp'>
                <img src={it.url_for('images/pages/footer/ic-whatsapp.svg')} />
            </div>
            <div id='deriv_livechat' />
            <div id='topbar-help-centre'>
                <img src={it.url_for('images/pages/footer/ic-help-centre.svg')} />
            </div>
            <div id='topbar-fullscreen'>
                <img src={it.url_for('images/pages/footer/ic-fullscreen.svg')} />
            </div>
        </div>
    </div>
);

const Layout = () => {
    if (it.is_pjax_request) {
        return <InnerContent />;
    }

    return (
        <html className='light'>
            <Head />
            <body className={it.language} >
                <Gtm />
                <div id='msg_notification' className='notice-msg center-text' />
                <div id='page-wrapper'>
                    <Header />
                    <WalletHeader />
                    <div id='content-holder'>
                        {/* <MobileMenu /> */}
                        {/* <a id='scrollup' /> */}
                        <InnerContent />
                    </div>
                    <Topbar />
                </div>
                <div id='deriv_iframe' />
                {/* <Elevio /> */}
                <LanguageMenuModal />
            </body>
        </html>
    );
};

export default Layout;
