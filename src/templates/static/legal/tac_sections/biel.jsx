import React from 'react';

const Biel = () => (
    <div data-show='eucountry'>
        <h2 data-anchor='supplementary-terms-and-conditions'>{it.L('Supplementary terms and conditions for Financial Products offered by Deriv Investments (Europe) Ltd')}</h2>
        <p>{it.L('These supplementary terms and conditions (these "ST&Cs") apply solely to the client of Deriv Investments (Europe) Limited ("DIEL") and will govern the relationship between clients and DIEL when trading Financial Products (as defined in the Key information documents [_1]here[_2]) with DIEL.', `<a href=${it.url_for('regulation#key_information_documents')}>`, '</a>')}</p>
        <p>{it.L('These ST&Cs form part of, and need to be read together with, the general terms and conditions relating to the use of [_1].', it.website_name)}</p>
        <p>{it.L('Clients should read these ST&Cs carefully as well as the Summary order execution policy and Summary conflicts policy, the applicable Contract details together with the Risk disclosure notice and any other documents that DIEL has supplied or in the future supplies to clients.')}</p>
        <p>{it.L('These ST&Cs begin to apply on the date DIEL opens the client\'s account, and, for any new versions after that, on the date DIEL notifies the client.')}</p>
        <p>{it.L('DIEL has the duty to disclose all the circumstances that are material to the product or services that it provides to the clients before and during the provision of such product and/or service. DIEL is obliged to do so in accordance with its licensed activities.')}</p>

        <h2 data-anchor='about-us-and-our-regulator'>{it.L('About DIEL and DIEL\'s regulator')}</h2>
        <p>{it.L('DIEL is a company established in Malta under registration number C70156 and having its registered office at W Business Centre, Level 3, Triq Dun Karm, Birkirkara, BKR 9033, Malta.')}</p>
        <p>{it.L('DIEL is authorised and regulated by the Malta Financial Services Authority ("MFSA") under the Investment Services Act (Cap. 370, Laws of Malta) (the "Act") to carry on investment business. It is also authorised and subject to limited regulation by the Financial Conduct Authority in the UK. Details about the extent of our authorisation and regulation by the Financial Conduct Authority are available from us on request. DIEL is authorised by the MFSA to deal on own account (i.e. offer and act as counterparty to trades) and to execute orders on behalf of other clients; both services are in relation to financial derivative products relating to foreign exchange, indices and other financial products or assets ("Financial Products"). DIEL is not authorised to and does not offer investment, financial, legal, tax, regulatory, and/or other types of advice or state an opinion in relation to a Transaction under any circumstances. Clients should get independent advice from an investment adviser if they have any doubts about dealing in financial products.')}</p>
        <p>{it.L('Deriv Investments (Europe) Limited is a company established in Malta, at W Business Centre, Level 3, Triq Dun Karm, Birkirkara BKR 9033. It is licensed in Malta and regulated by the Malta Financial Services Authority, Triq l-Imdina, Zone 1, Central Business District, Birkirkara CBD 1010, Malta, under the Investments Services Act to provide investment services in the European Union.')}</p>
        <p>{it.L('DIEL is authorised by the MFSA to deal on own account (i.e. offer and act as counterparty to trades) and to execute orders on behalf of other clients; both services are in relation to financial derivative products relating to foreign exchange, indices and other financial products or assets ("Financial Products"). DIEL is not authorised to and does not offer investment, financial, legal, tax, regulatory, and/or other types of advice or state an opinion in relation to a Transaction under any circumstances. Clients should get independent advice from an investment adviser if they have any doubts about dealing in financial products.')}</p>
        <p>{it.L('From time to time, DIEL may decide to provide the client with written or video information, which DIEL may publish on its website or provide to the client in any other manner. DIEL will endeavour to ensure the accuracy and completeness of this information, but it will not constitute independent investment research or investment advice provided by DIEL to the client.')}</p>
        <p>{it.L('In providing these services, DIEL is bound by the Act, any applicable regulations, by-laws, licence conditions, guidelines, exchange requirements, and other provisions or market practices (the "Rules"). In the event of conflict between these ST&Cs and the Rules, the latter should prevail.')}</p>

        <h2 data-anchor='restrictions'>{it.L('Restrictions')}</h2>
        <p>{it.L('Residents of countries that have been identified by the FATF as having strategic deficiencies shall be restricted from opening an account with Deriv Investments (Europe) Limited.')}</p>

        <h2 data-anchor='client-classification'>{it.L('Client classification')}</h2>
        <p>{it.L('Under the Rules, clients may be categorised into one of the following three categories:')}</p>
        <ul className='bullet'>
            <li>{it.L('Retail clients')}</li>
            <li>{it.L('Professional clients')}</li>
            <li>{it.L('Eligible counterparties')}</li>
        </ul>
        {/* Grammatical errors in the next para */}
        <p>{it.L('The level of protection offered and due to each client depends on the category to which each client is assigned. Retail clients benefit from the highest degree of protection. The Company will assess the client\'s knowledge and experience versus the appropriateness of the requested service/investment product.')}</p>
        <ol>
            <li>
                <h4>{it.L('Retail clients')}</h4>
                <p>{it.L('Unless otherwise advised, DIEL shall treat a client as a retail client. Clients may also request, by writing to DIEL, to change the category in which they have been classified, and this may have an effect on the level of protection afforded to them. DIEL will assess the client\'s knowledge and experience versus the appropriateness of the requested service/investment product.')}</p>
                <p>{it.L('Clients hereby declare that they are dealing with DIEL outside the scope of their economic or professional activity, and DIEL will therefore treat the client as an individual retail client for the purposes of EMIR compliance, unless advised otherwise.')}</p>
            </li>
            <li>
                <h4>{it.L('Professional clients')}</h4>
                <p>{it.L('If the client asks to be treated as a professional client, they need to meet certain specified quantitative and qualitative criteria. On the basis of the client\'s request to be categorised as professional, the Company undertakes an assessment of the client\'s expertise, knowledge, and experience to determine whether they fall within this category and whether they are able to make their own investment decisions and understand the risks involved. If the relevant criteria are not met, the Company reserves the right to choose whether to provide its services under this requested classification.')}</p>
                <p>{it.L('Professional clients are offered the possibility to request reclassification, and thus increase the level of regulatory protection afforded, at any time during the relationship.')}</p>
                <p>{it.L('DIEL shall not be obliged to provide professional clients with the following:')}
                    <ol>
                        <li>{it.L('Assessment of appropriateness of the requested service or product as DIEL assumes that the client appreciates the risks associated with such investment services and products offered by the Company')}</li>
                        <li>{it.L('Risk warnings and notices related to Transactions and investments in the proposed instruments')}</li>
                        <li>{it.L('Educational material')}</li>
                        <li>{it.L('Compensation under Investor Compensation Scheme')}</li>
                    </ol>
                </p>
            </li>
            <li>
                <h4>{it.L('Eligible counterparties')}</h4>
                <p>{it.L('When a client is classified as an Eligible Counterparty, DIEL shall not provide them with')}
                    <ol>
                        <li>{it.L('Best execution requirements')}</li>
                        <li>{it.L('Assessment of appropriateness of the requested service or product, as DIEL assumes that the client appreciates risk disclosures associated with the requested investment services and products offered by the Company')}</li>
                        <li>{it.L('Risk warnings and notices related to the client\'s Transactions')}</li>
                        <li>{it.L('Client reporting')}</li>
                        <li>{it.L('The Investor Compensation Scheme')}</li>
                    </ol>
                </p>
            </li>
        </ol>
        <p>{it.L('DIEL reserves the right to accept or refuse any requests for change in classification.')}</p>
        <p>{it.L('DIEL is entitled under the Rules to rely upon information provided by clients. Clients should ensure that they provide DIEL with accurate and complete information and notify DIEL in the event that any information supplied to DIEL changes. Clients should note that if they provide DIEL with inaccurate information, or if they fail to notify DIEL of any changes to information previously supplied by them, this may adversely affect the quality of the services that DIEL can provide.')}</p>
        <p>{it.L('Clients are also advised that their rights may be prejudiced if they provide the wrong information as the Company would not be in a position to act in their best interests.')}</p>

        <h2 data-anchor='appropriateness-test'>{it.L('Appropriateness test')}</h2>
        <p>{it.L('In the course of provision of services, DIEL shall, where applicable, conduct an appropriateness test in order to determine whether, in DIEL\'s view and on the basis of the information provided by the client, the client has the necessary knowledge and experience in the investment field to understand the risks involved in the specific type of product or service offered or demanded.')}</p>
        <p>{it.L('Where DIEL considers, on the basis of the information provided by the client that the client does not possess the knowledge and experience to appreciate the risks associated with an investment in the proposed instrument, DIEL will issue a warning to the client. Such a warning shall be displayed on the website.')}</p>
        <p>{it.L('Where DIEL does not manage to obtain sufficient information to assess the appropriateness of the product or service for the client, DIEL will similarly inform the client that DIEL is not in a position to assess appropriateness.')}</p>

        <h2 data-anchor='best-execution-policy'>{it.L('Best execution policy')}</h2>
        <p>{it.L('Subject to any specific instructions which may be provided by the client, when executing client orders, DIEL will take all reasonable steps to obtain the best possible results for the client. The best possible results will be determined in terms of total consideration, that is, the price of the instrument and the costs related to execution, which shall include all expenses incurred by the client that are directly related to the execution of the order.')}</p>
        <p>{it.L('Other best execution factors, such as speed of execution, likelihood of execution and settlement, size, nature, or any other considerations relevant to the execution of a particular order, may also be applied by DIEL in order to obtain the best possible results for the client.')}</p>
        <p>{it.L('Since DIEL exclusively deals on own account in Financial Products, this means that DIEL acts as the execution venue, and accordingly all transactions entered into with DIEL will be executed outside a regulated market (stock exchange) or multilateral trading facility.')}</p>
        <p>{it.L('The full version of DIEL\'s best execution policy is available on request.')}</p>

        <h2 data-anchor='clients-money'>{it.L('Clients\' money')}</h2>
        <p>{it.L('Monies deposited by clients with DIEL in advance of a trade or pending withdrawal is treated by DIEL as clients\' money. DIEL holds such monies in pooled or omnibus clients\' money bank accounts opened with banks or other institutions ("Institutions"), segregated from DIEL\'s own money. Such clients\' money bank accounts may be opened with EEA Institutions or Institutions outside the EEA. Where clients\' money is held with non-EEA Institutions, this means that such accounts will be subject to laws other than those of an EEA member state and clients\' rights may differ accordingly.')}</p>
        <p>{it.L('The Financial Products that DIEL offers to deal in are contracts entered into between clients and DIEL. Under these contracts and subject to the specific terms of the relevant contract, in consideration for the premium or price that clients pay DIEL, DIEL promises to pay clients a certain amount if the reference assets or measurements perform in a particular manner. These contracts accordingly are not instruments that DIEL holds on clients\' behalf and neither benefits from clients\' assets protection in the event of DIEL\'s insolvency. Similarly, the premium or price that clients pay to take out a trade is not held as clients\' money but as consideration for DIEL\'s undertaking to pay.')}</p>
        <p>{it.L('The client acknowledges and agrees to the following:')}
            <ul className='bullet'>
                <li>{it.L('The Company will not pay interest on the client money.')}</li>
                <li>{it.L('Where the client\'s obligations to the Company are due and payable, the Company shall cease to treat as client money the amount equal to the amount of such obligations.')}</li>
                <li>{it.L('The Company may use the client money for the purposes of meeting obligations that are incurred by the Company in connection with the margining, guaranteeing, securing, transferring, adjusting, or settling of the client\'s dealings in derivatives.')}</li>
            </ul>
        </p>

        <h2 data-anchor='investor-compensation-scheme'>{it.L('Investor Compensation Scheme')}</h2>
        <p>{it.L('DIEL forms part of [_1]the Investor Compensation Scheme[_2] (the "Scheme"), which is a rescue fund for investors that are clients of failed investment firms licensed by the MFSA. The Scheme covers 90% of the Company\'s net liability to a client in respect of investments that qualify for compensation under the Investment Services Act subject to a maximum payment to any one person of €20,000. The Scheme is based on EC Directive 97/9.', '<a href="http://www.compensationschemes.org.mt" target="_blank" rel="noopener noreferrer">', '</a>')}</p>
        <p>{it.L('Cover is made available on the basis of the depositor rather than on the basis of the number of deposits, meaning that if an individual has multiple accounts, they will only be covered up to €20,000 on the global amount. Any other amount exceeding such a threshold is not protected and will thus have to be borne by the investor.')}</p>
        <p>{it.L('Professional clients and eligible counterparties do not fall within the scope of the Investor Compensation Scheme.')}</p>

        <h2 data-anchor='governing-law-and-jurisdiction'>{it.L('Governing law and jurisdiction')}</h2>
        <p>{it.L('These ST&Cs are to be governed by and construed in accordance with Maltese law and the parties hereto agree to submit to the non-exclusive jurisdiction of the Maltese courts.')}</p>
    </div>
);

export default Biel;
