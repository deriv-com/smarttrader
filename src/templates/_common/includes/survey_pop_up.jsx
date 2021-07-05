import React from 'react';

const SurveyPopUp = () => (
    <React.Fragment>
        <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
                __html: `

            function getCookieItem(sKey) {
                'use strict';
                if (!sKey) { return null; }
                const match = document.cookie.match(new RegExp('(^| )' + sKey + '=([^;]+)'));
                return match[2] ? match[2] : null
            }

            const lang = getCookieItem('language');

            if(lang === "EN") {
                (function (t, e, s, o) { var n, a, c; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), a = n[n.length - 1], c = e.createElement(s), c.type ="text/javascript", c.async = !0, c.id = o, c.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd4yQc4I8h7FHKcdAVRZxsP_2Bf6xhonamzIsR_2Fz9x9sNs8.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");
            } else if (lang === "ID") {
               (function (t, e, s, o) { var n, a, c; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), a = n[n.length - 1], c = e.createElement(s), c.type ="text/javascript", c.async = !0, c.id = o, c.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd54WcWBAICVaH1t1TB2N_2FuYgyLVXFZ5_2FHCxeDJ4QrHoK.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");
            }  else if (lang === "ES") {
                (function (t, e, s, o) { var n, a, c; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), a = n[n.length - 1], c = e.createElement(s), c.type ="text/javascript", c.async = !0, c.id = o, c.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd54WcWBAICVaH1t1TB2N_2FuYNLz_2BZJOhHAGxP6NXeNNC5.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");
            } else if (lang === "PT") {
               (function (t, e, s, o) { var n, a, c; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), a = n[n.length - 1], c = e.createElement(s), c.type ="text/javascript", c.async = !0, c.id = o, c.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd54WcWBAICVaH1t1TB2N_2FuZxmEac_2Bn8pCN8GVTdHEJU5.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");

            }

            ` }}
        />
    </React.Fragment>
);

export default SurveyPopUp;
