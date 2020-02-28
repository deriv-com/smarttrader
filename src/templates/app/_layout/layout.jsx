import React from 'react';
import Head from './head.jsx';
import Header from './header.jsx';
import MobileMenu from './mobile_menu.jsx';
// import Footer from './footer.jsx';
import Elevio from '../../_common/includes/elevio.jsx';
import Gtm from '../../_common/includes/gtm.jsx';
import InterviewPopup from '../../_common/components/interview_popup.jsx';
import Title from '../../_common/components/title.jsx';

const CONTENT_PLACEHOLDER = 'CONTENT_PLACEHOLDER';

const WithLayout = ({ children }) => {
    const content_class = `${it.current_route || ''}-content`;
    return (
        <div id='content' className={it.current_route ? content_class : undefined}>
            <div id='page_info' style={{ display: 'none' }}>
                <Title />
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
    <div id='topbar' className='no-print primary-bg-color-dark'>
        <div className='gr-row'>
            {/* <div id='topbar-msg' className='gr-6 gr-5-t gr-12-p gr-12-m invisible upgrademessage center-text'>
                <span className='gr-hide-m invisible' id='virtual-wrapper'>
                    <span id='virtual-text'>{it.L('You\'re using a Virtual Account.')}</span>
                </span>
                <a className='pulser invisible' />
            </div> */}
            <div className='gr-3 gr-3-t gr-12-p gr-12-m' id='topbar-info'>
                <div className='gr-row'>
                    <div className='gr-2' />
                    <div className='gr-1 align-self-center no-underline' data-balloon-pos='up'>
                        <div id='network_status' />
                    </div>
                    <div className='gr-7 gr-6-m align-self-center'>
                        <span className='no-underline nowrap' id='gmt-clock' />
                    </div>
                    <div className='gr-2 align-self-center' id='topbar-fullscreen-wrapper'>
                        <div id='topbar-fullscreen'>
                            <img src={it.url_for('images/pages/footer/ic-fullscreen.svg')} />
                        </div>
                    </div>
                    {/* <div className='gr-3 gr-5-m'>
                        <div className='languages invisible'>
                            <LanguageUl type='display'  color='white' />
                            <LanguageUl type='select'   color='black' />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
);

const Layout = () => {
    if (it.is_pjax_request) {
        return <InnerContent />;
    }
    return (
        <html>
            <Head />
            <body className={it.language}>
                <Gtm />
                <div id='msg_notification' className='notice-msg center-text' />
                <div id='page-wrapper'>
                    <Header />
                    <div id='content-holder'>
                        <MobileMenu />
                        {/* <a href='javascript:;' id='scrollup' /> */}
                        <InnerContent />
                    </div>
                    {/* <Footer /> */}
                    <Topbar />
                </div>
                <InterviewPopup /> {/* TODO: remove when UX research is finished */}
                <Elevio />
            </body>
        </html>
    );
};

export default Layout;
