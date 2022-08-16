import React from 'react';

const Complaints = () => (
    <div>
        <h2 data-anchor='complaints-and-disputes'>{it.L('Complaints and disputes')}</h2>
        <p>{it.L('If the client would like to file a complaint about the Company’s service, the client can send the details related to the client’s complaint to the Company at [_1]complaints@deriv.com[_2]. The Company will investigate the client’s enquiry and send the client a final response within 15 days from the date on which the complaint is received.', '<a href="mailto:complaints@deriv.com">', '</a>')}</p>
        <p>{it.L('If the client’s account is registered with Deriv (BVI), and the Company does not resolve the client’s complaint to the client’s satisfaction, the client can escalate the complaint to the Financial Commission. In that case, the client’s complaint will go through the following procedure:')}</p>
        
        <h2 data-anchor='Filing complaints'>{it.L('Filing complaints')}</h2>
        <ul className='bullet'>
            <li>{it.L('The client may file a complaint with the Financial Commission up to 45 days after the incident.')}</li>
            <li>{it.L('The Financial Commission has 5 days to acknowledge that the client’s complaint was received and 14 days to answer the complaint through the Company’s Internal Dispute Resolution (IDR) procedure.')}</li>
            <li>{it.L('The client will be able to file a complaint with the Financial Commission only if the client is not satisfied with the Company’s decision or if the decision wasn’t made within 14 days.')}</li>
        </ul>

        <h2 data-anchor='Investigation phase'>{it.L('Investigation phase')}</h2>
        <ul className='bullet'>
            <li>{it.L('The Financial Commission will investigate the validity of the complaint within 5 business days.')}</li>
            <li>{it.L('The Head of the Dispute Resolution Committee (DRC) will contact both the client and the Company within 5 business days to obtain all necessary information and see if there is a chance to settle the complaint during the investigation phase.')}</li>
            <li>{it.L('If no settlement opportunity can be found, the complaint will proceed to the determination phase to be handled by the DRC.')}</li>
        </ul>

        <h2 data-anchor='Determination phase'>{it.L('Determination phase')}</h2>
        <ul className='bullet'>
            <li>{it.L('The DRC will decide on the complaint (it should be noted that the DRC mentions no timeframe for announcing its decision).')}</li>
            <li>{it.L('The DRC may request additional information from the client or the Company, who must then provide the requested information within 7 days.')}</li>
        </ul>

        <h2 data-anchor='Awards and orders'>{it.L('Awards and orders')}</h2>
        <ul className='bullet'>
            <li>{it.L('The decisions made by the DRC are binding on the Company. DRC’s decisions are binding on the client only if the client accepts them.')}</li>
            <li>{it.L('If the client agrees with a DRC’s decision, the client will need to accept it within 4 weeks. If the client does not respond to the DRC’s decision within 4 weeks, the complaint is considered closed.')}</li>
            <li>{it.L('The Company must award the settlement within 28 days of when the decision is reached.')}</li>
            <li>{it.L('If the decision is made in the Company’s favour, the client must provide a release for the Company within 7 days of the decision, and the complaint will be considered closed.')}</li>
        </ul>

        <p>{it.L('If the Company disagrees with the DRC’s decision, a response must be provided to the DRC and to the Company within 4 weeks, and the client can further escalate the client’s complaint to the British Virgin Islands Financial Services Commission by email to [_1]commissioner@bvifsc.vg[_2].', '<a href="mailto:commissioner@bvifsc.vg">', '</a>')}</p>

        <h2 data-anchor='Disclaimer'>{it.L('Disclaimer')}</h2>
        <p>{it.L('The Financial Commission accepts appeals for 45 days following the date of the incident and only after the client has tried to resolve the issue with the Company directly.')}</p>
        <p>{it.L('If the client’s complaint relates to the Company’s data processing practices, the client can submit a formal complaint to the Office of the Information Commissioner.')}</p>

    </div>
);

export default Complaints;
