import React from 'react';

const Privacy = () => (
    <div>
        <h2 data-anchor='security-and-privacy'>{it.L('Security and privacy')}</h2>
        <p>{it.L('The Company recognises the importance of protecting the client\'s personal and financial information.')}</p>
        <p>{it.L('All the information that the Company obtains about the client assists the Company in servicing the client and the client\'s account. The Company knows that the client may be concerned about what the Company does with this information.')}</p>
        <p>{it.L('The Company has outlined the Company\'s privacy practices for the client as follows:')}</p>

        <h2 data-anchor='use-of-information'>{it.L('Use of information')}</h2>
        <p>{it.L('The Company operates in full compliance with the General Data Protection Regulation (GDPR) and other applicable Data Protection laws. These regulatory measures oblige the Company to use the clients\' personal data according to the principles of fair, lawful, and transparent information processing.')}</p>
        <p>{it.L('Any processing of personal data undertaken by Deriv Investments (Europe) Limited will be in compliance with the Company\'s terms of service and these terms of security and privacy policy.')}</p>
        <p>{it.L('The Company may collect basic tax residence information for the purposes of Common Reporting Standard (CRS) compliance. The tax information that the client may provide will only be disclosed to the authorities who are legally charged with collecting this information for CRS reporting. The Company shall disclose the client\'s tax information to them only to the extent that the Company is legally obliged to. The Company does not use, disclose, or process this information in any other way at any time.')}</p>
        <p>{it.L('It is the Company\'s commitment to safeguard the client\'s privacy online at all times. The Company only uses the client\'s personal information to help the Company service the client\'s account, to improve the Company\'s services to the client, and to provide the client with products that the client has requested. The Company does not sell the client\'s personal information to third parties, but the Company may provide it to payment providers to facilitate transactions on the client\'s account.')}</p>
        <p>{it.L('The client\'s personal information is used primarily as a way of validating the client as the legitimate account owner and proper recipient of withdrawal payments. The Company also uses this information to process the client\'s trades. The Company collects from the client all personal and financial data directly relating to the client when the client fills in the Company\'s account opening form. In all instances, the client has either a legal or a contractual obligation to provide the Company with the information. If such information is not provided, the Company will be unable to provide the client with its services.')}</p>
        <p>{it.L('The Company reserves the right to request further information from the client whenever deemed appropriate under the circumstances. For example, the Company may ask the client to send the Company additional acceptable documents to confirm the authenticity of the client\'s account details or of any withdrawal request.')}</p>
        <p>{it.L('The client agrees that when using the Live Chat feature on the Company website and applications, all personal information that the client enters in the chat channel, including but not limited to the client\'s first name and email address, is processed by the Company and stored in the Company\'s databases.')}</p>
        <p>{it.L('The Company holds all the personal data that the Company collects from the client with due diligence and only processes them for purposes as required or allowed by law. This includes the process of obtaining and sharing of certain information with third parties for credit or identity checks to comply with legal and regulatory obligations. In certain cases, the Company may process the client\'s data to fulfill the Company\'s contractual obligations with the client.')}</p>
        <p>{it.L('The Company also collects basic tax residence information for the purposes of CRS/FATCA compliance. The tax information that the client provides may only be disclosed to the authorities who are legally charged with collecting this information for CRS/FATCA reporting, and [_1] will only do so to the extent that it is legally obliged to collect it from the clients and disclose it to the authorities. The Company does not use, disclose, or process this information in any other way at any time.', it.website_name)}</p>
        <p>{it.L('The client may update the client\'s personal information at any time by logging in to the "Settings" section of the client\'s account. It is the client\'s responsibility to ensure that [_1] is promptly and continually informed of any change in the client\'s personal information. The client should note that if the client provides the Company with inaccurate information, or if the client fails to notify the Company of any changes to the information previously supplied by the client, this may adversely affect the quality of the services that the Company can provide.', it.website_name)}</p>
        <div id='gamstop_uk_display' className='invisible'>
            <p>{it.L('The Company also has a regulatory obligation to send the personal data of the clients residing in the UK to GAMSTOP to check whether or not  they have self-excluded with GAMSTOP. To find out more, please read the [_1]GAMSTOP privacy policy[_2].', '<a href="https://www.gamstop.co.uk/privacy-policy" target="_blank" rel="noopener noreferrer">', '</a>')}</p>
        </div>

        <h2 data-anchor='profiling-and-categorisation'>{it.L('Profiling and categorisation')}</h2>
        <p>{it.L('The Company collects and assesses the client\'s data to profile the client in relation to the Company\'s products. The Company does this manually with the assistance of automated processing. By categorisation, the Company will be able to provide the most appropriate products and services to the client.')}</p>

        <h2 data-anchor='transfer-of-data'>{it.L('Transfer of data')}</h2>
        <p>{it.L('The Company may transfer relevant personal data to any company within Deriv Group Ltd where it is necessary for the performance of a contract with the client related to the Company services.')}</p>
        <p>{it.L('The Company may need to transfer the client\'s personal data to any of its business associates or payment providers within or outside of the European Economic Area (EEA), including countries that might not offer an equivalent level of protection of personal data, for the purpose of processing by third parties.')}</p>
        <p>{it.L('The Company may also transfer the client\'s data to third parties outside the EEA for content delivery services, customer relationship management services, and communication and marketing services.')}</p>
        <p>{it.L('In all instances, the Company takes all reasonably necessary steps to ensure the client\'s personal data is treated securely and in accordance with this privacy policy and in compliance with any applicable data protection laws. These steps may include placing a contractual obligation on third parties or ensuring that third parties receiving data are certified under an approved certification mechanism such as the one on the Privacy Shield framework.')}</p>

        <h2 data-anchor='access-to-data'>{it.L('Access to data')}</h2>
        <p>{it.L('If a law or regulation or the order of a court of a competent jurisdiction or a governmental or law enforcement agency requires the Company to disclose the client\'s personal or financial information, the Company shall promptly notify the client, as deemed appropriate, to give the client the opportunity to seek protection for the information for which disclosure is sought unless the Company is legally prohibited from doing so. Any such disclosure shall not be interpreted as a breach of these terms and conditions.')}</p>

        <h2 data-anchor='cookies-and-device-information'>{it.L('Cookies and device information')}</h2>
        <p>{it.L('Cookies are small text files stored on computer drives and are widely used in order to make websites work and to improve the user experience. All recent versions of browsers give the client a level of control over cookies. The client can delete all cookies that are already on the client\'s computer, and the browser can be set to prevent them from being placed. However, if the client chooses not to receive the Company\'s cookies, the full usability of the Company\'s website may be adversely affected.')}</p>
        <p>{it.L('The client should note that the Company\'s website generates log files that record the IP addresses of accesses to the client\'s account, login attempts, and device information such as the manufacturer, model, operating system, and browser. This information is gathered for the sole purpose of providing assistance with investigating a client\'s account in the unlikely event that the account is accessed by unauthorised users. Information supplied by some cookies also helps the Company understand how visitors use the website, so that the Company can improve how it presents its content.')}</p>
        <p>{it.L('The Company\'s cookies are not deemed dangerous and cannot access any other information on the client\'s computer.')}</p>
        <p>{it.L('By using or interacting with the [_1] website, the client is giving permission to the use of the Google Analytics User ID Feature, which allows Google to capture the client\'s [_1] login ID such as VRTC1234 and MT1234. When this feature is enabled, no personally identifiable information other than the client\'s [_1] login ID, or other data that can be linked to such information by Google, is shared with or disclosed to Google.', it.website_name)}</p>
        <p>{it.L('To provide the client with a better experience, some of the services offered by [_1] may require permission to access the client\'s cloud storage services, such as Google Drive, to save or load DBot trading strategies. In such instances', it.website_name)}</p>
        <ul className='bullet'>
            <li>{it.L('The Company does not store any data related to the client\'s cloud storage service on any of the Company\'s servers. All files are downloaded on the client\'s local machines.')}</li>
            <li>{it.L('The Company does not share any data related to the client\'s cloud storage service with anyone.')}</li>
            <li>{it.L('The Company only accesses the client\'s cloud storage when the client\'s action initiates it. Clients can disconnect their storage service at any time.')}</li>
        </ul>

        <div data-show='eucountry'>
            <h2 data-anchor='transfer-of-data'>{it.L('Transfer of data')}</h2>
            <p>{it.L('The Company may also transfer relevant personal and financial data to any company within the Deriv Group companies. This includes any of the Company\'s business associates or payment providers within or outside of the EEA, including countries that might not offer an equivalent level of protection of personal data. In all instances, the Company places a contractual obligation on such third parties to offer the same level of rights and protection as stipulated in the GDPR.')}</p>
            <p>{it.L('The client also has the right to request copies of any personal information that the client has provided to the Company and to request that the Company transmit such information to other service providers.')}</p>

            <h2 data-anchor='consent'>{it.L('Consent')}</h2>
            <p>{it.L('When the client opens an account with the Company, the Company will request the client\'s consent for the distribution of marketing materials to the e-mail address that the client provides to the Company upon sign-up.')}</p>

            <h2 data-anchor='right-of-object'>{it.L('Right to object')}</h2>
            <p>{it.L('The client has the right to object to the direct distribution of marketing materials. This can be done by either not providing the client\'s consent to any marketing material before the service is rendered or revoking it at any point during the service. In both cases, the Company will refrain from distributing marketing materials to the client.')}</p>

            <h2 data-anchor='access-to-personal-data'>{it.L('Access to personal data')}</h2>
            <p>{it.L('Access to the client\'s personal data is strictly prohibited, with the exception of key [_1] personnel and only as needed for the performance of their duties.', it.website_name)}</p>
            <p>{it.L('If [_1] is legally required to disclose the client\'s personal or financial information by law, regulation, or pursuant to the order of a court of competent jurisdiction or a governmental agency, the Company will promptly notify the client, as it deems appropriate, to give the client the opportunity to seek protection for the information. The Company will do so unless legally prohibited. Such required disclosure shall not be interpreted as a breach of this terms and conditions agreement.', it.website_name)}</p>
            <p>{it.L('The client also has the right to request that the Company copy, modify, or remove the client\'s personal information as long as such actions do not breach any legal or regulatory obligations that the Company may have.')}</p>
        </div>

        <h2 data-anchor='data-retention'>{it.L('Data retention')}</h2>
        <p>{it.L('The Company keeps the client\'s information for the whole duration of the client\'s subscription with the Company. If the Company chooses to close the client\'s Binary.com account, the client\'s data will be kept only until the Company\'s legal and regulatory obligations on data retention are met. The Company shall delete the client\'s data when the applicable retention period expires. The criteria the Company uses for determining the retention period for the client\'s personal data will be any applicable regulatory requirements or legal obligations, including tax, financial, and anti-money laundering laws, or to establish or defend potential legal claims.')}</p>

        <h2 data-anchor='security-statement'>{it.L('Security statement')}</h2>
        <p>{it.L('Taking the following measures, the Company is committed to making sure that the client\'s personal data and transactions are secure:')}</p>
        <ol>
            <li>{it.L('The client\'s password and login ID are unique, and passwords are hashed so that not even [_1] staff can read them. This is the reason why the Company cannot retrieve the client\'s password and has to issue the client with a new one, sent to the client\'s email address, if the client cannot recall it.', it.website_name)}</li>
            <li>{it.L('The Company maintains customer balances in cash or cash equivalent. The Company ensures that 100% of each customer\'s balance is available for immediate withdrawal, subject to verification.')}</li>
            <li>{it.L('All credit card details are submitted directly to the Visa/Mastercard network using the latest SSL encryption technology, in accordance with bank policies.')}</li>
            <li>{it.L('The Company\'s information security policies are based on industry best practices in access control and business continuity.')}</li>
            <li>{it.L('The Company uses identity verification services and real-time fraud detection measures to help protect the client from unauthorised access to the client\'s account. The Company also monitors account activity for signs of unusual activity that might indicate fraud and work with collection and law-enforcement agencies to address fraud issues.')}</li>
            <li>{it.L('The responsibility for the security of the client\'s login credentials, any linked email address, and any personal device on which the client\'s account is accessible lies solely with the client. The Company shall not be held responsible if there is unauthorised use of the account when the Company is not at fault.')}</li>
            <li>
                {it.L('Whether the client uses a shared device or the client\'s own device in a public place either offline or on public WiFi, doing so might put the information that the client enters or receives in danger of being captured. To protect data in such cases, it is the clients\' responsibility to take the following precautions and educate themselves on other security measures they can take:')}
                <ul className='bullet'>
                    <li>{it.L('Not sending or receiving private information unless a secure webpage is being used (preferably, use a secure, encrypted Virtual Private Network (VPN)')}</li>
                    <li>{it.L('Making sure of having effective and updated antivirus/antispyware software and firewall in place before using public WiFi')}</li>
                    <li>{it.L('Not leaving devices unattended')}</li>
                    <li>{it.L('Avoiding financial transactions that might reveal valuable passwords or personal information such as credit card numbers')}</li>
                    <li>{it.L('Using browser tools to delete files and cookies and clearing browsing history')}</li>
                    <li>{it.L('Not saving login credentials on a shared device')}</li>
                    <li>{it.L('Logging out of account-based websites at the end of the session')}</li>
                </ul>
            </li>
        </ol>
        <br />

        <h2 data-anchor='links'>{it.L('Links')}</h2>
        <p>{it.L('The Company\'s website contains links to other websites and may contain banner or icon advertisements related to third-party websites. These websites and their advertisements may submit cookies to the client\'s web browser, which is beyond the Company\'s control. The Company is not responsible for the privacy practices or the content of such websites. The Company encourages the client to read the privacy policies of these websites because their practices may differ from the Company\'s.')}</p>

        <h2 data-anchor='clients-rights'>{it.L('Client\'s rights')}</h2>
        <p>{it.L('Below is a list of the client\'s legal rights regarding personal data, not all of which may be applicable to the client at any one time:')}</p>
        <ul className='bullet'>
            <li>{it.L('Right of access to the client\'s  personal data: the client has the right to request and receive a copy of all the personal data the company holds about the client.')}</li>
            <li>{it.L('Right of rectification: the client has the right to request the correction of any personal data that the Company holds about the client and are either inaccurate or incomplete.')}</li>
            <li>{it.L('Right to erasure: the client has the right to obtain the erasure of the client\'s personal data, provided, among others, the personal data in question are no longer necessary in relation to the purpose for which they were collected.')}</li>
            <li>{it.L('Right to restriction and right to object: the client has the right to restrict the Company\'s processing activities or to object to the processing of the client\'s personal data.')}</li>
            <li>{it.L('Right to data portability: the client has the right to request a copy of the client\'s personal data in a digital format and, where possible, ask the Company to transfer it to another company.')}</li>
        </ul>
        <p>{it.L('The right to erasure is not an absolute right. The Company has to comply with retention requirements set out on any applicable laws, including financial regulations and anti-money laundering laws.')}</p>
        <p>{it.L('The client can make any of the requests set out above by emailing the Company\'s data protection officer directly at dpo@deriv.com or by using the contact details on the [_1]Contact Us[_2] page.', `<a href=${it.url_for('contact')}>`, '</a>')}</p>
        <p>{it.L('If the client is unhappy with how the Company handles the personal data, the client can file a complaint with the Company. If the client is not satisfied with the outcome of the Company\'s internal complaints procedure, or if the client considers that the client\'s complaint has not been handled correctly, the client may lodge a complaint to the Company\'s lead supervisory authority on data processing practices.')}</p>

        <h2 data-anchor='marketing'>{it.L('Marketing')}</h2>
        <p>{it.L('The client has the right to opt out of receiving marketing materials from the Company. This can be done by either not providing the client\'s consent to receiving marketing materials when opening an account with the Company or by revoking it at any point during the period that the client holds an account with the Company. In both cases, the Company shall not send any marketing materials to the client.')}</p>

        <h2 data-anchor='notification-of-changes'>{it.L('Notification of changes')}</h2>
        <p>{it.L('Any changes in the Company\'s privacy policy or security statement will be posted on this website. For any material changes that directly affect the economic use of the client\'s personal information, the Company will request the client\'s prior authorisation in writing before effecting such changes on the client\'s account.')}</p>
        <p>{it.L('The client also has the right to request that the Company inform the client about the personal data that the Company processes about the client and to provide its correction where necessary.')}</p>

        <div data-show='eucountry'>
            <h2 data-anchor='data-protection-officer'>{it.L('Data protection officer')}</h2>
            <p>{it.L('The Company\'s data protection officer can be contacted at [_1]', `<a href=${'mailto:dpo@binary.com'}>dpo@binary.com</a>`)}</p>
            <p>{it.L('For full contact details of [_1], the client is encouraged to check [_1]\'s [_2]Contact us[_3] page.', it.website_name, `<a href=${it.url_for('contact')}>`, '</a>')}</p>

            <h2 data-anchor='complaints'>{it.L('Complaints')}</h2>
            <p>{it.L('For details on submitting a complaint to the Company\'s lead supervisory authority on data processing practices, the client is encouraged to check [_1]\'s [_2]Complaints and disputes[_3] section.', it.website_name, `<a href=${it.url_for('terms-and-conditions#complaints')}>`, '</a>')}</p>
        </div>
    </div>
);

export default Privacy;
