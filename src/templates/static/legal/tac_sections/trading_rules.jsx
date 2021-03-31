import React from 'react';

const TradingRules = () => (
    <div>
        <h2 data-anchor='trading-rules'>{it.L('Trading rules')}</h2>
        <p>{it.L('The Company may impose certain rules and restrictions on the placing of market orders on this website. Such rules may change from time to time, according to market conditions and other factors. The following indicative rules are currently in place:')}
            <ul className='bullet'>
                <li>{it.L('Contracts will not usually be offered at odds under 0.05 to 1 (i.e. payouts of under 1.05 USD/GBP/EUR/AUD for each 1 USD/GBP/EUR/AUD staked).')}</li>
                <li>{it.L('Contracts offered by Deriv Investments (Europe) Limited have a minimum purchase price of 5 USD/GBP/EUR.')}</li>
                <li>{it.L('Contracts are not usually offered in the last hour of trade of any given market (for foreign exchange markets, the restriction may be extended up to 3 hours).')}</li>
                <li>{it.L('Contracts will not usually be offered when the underlying market is at its intraday high or intraday low.')}</li>
                <li>{it.L('Contracts will not usually be offered during the first 10 minutes of market trade.')}</li>
                <li>{it.L('During fast markets (i.e. periods of very fast market movements), contracts may be offered at prices more unfavourable than those offered in usual market conditions.')}</li>
                <li>{it.L('Certain limits are imposed as to the acceptable levels for barrier/strike prices of contracts. Typically, the barrier/strike may not be too close nor too far from the current underlying market level.')}</li>
                <li>{it.L('Contracts may not expire on a weekend; therefore, the expiry date of a contract may be pushed back to the following Monday in the event of a contract expiry date falling on a Saturday or a Sunday.')}</li>
                <li>{it.L('Market prices are updated at most once per second.  For any given second, the market price will be updated to the first tick, if any, received in that particular second on the Company data feed.')}</li>
                <li>{it.L('The Company does not guarantee the ability to sell a contract prior to its expiration time.')}</li>
                <li>{it.L('Corporate actions')}
                    <ul className='bullet'>
                        <li>{it.L('A corporate action can include but is not limited to assimilation, acquisition, bankruptcy, bonus issue, bonus rights, cash dividend, class action, delisting, de-merger, general announcement, initial public offering (IPO), liquidation, merger, change in par value, scheme of arrangement, stock dividend, stock split, return of capital, and reverse stock split.')}</li>
                        <li>{it.L('One or more of the client’s trades may be affected by a corporate action. In that case, the company may take one or more of the following measures:')}
                            <ul className='bullet'>
                                <li>{it.L('Credit an amount to or debit an amount from the client’s account')}</li>
                                <li>{it.L('Restrict the client’s account to prevent the client from closing any affected trades until the corporate action is passed')}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

            <h2 data-anchor='contract-payouts'>{it.L('Contract payouts')}</h2>
            <p>{it.L('Contract payouts shall be determined by the Company by reference to the market quotes as displayed on the website relevant to the underlying index(ices) of the contract(s) or from the interbank trading data received by the Company for forex quotes or commodity prices as displayed on the website, provided that the Company has the right to make corrections to such data in the event of mispriced or typographically incorrect data. Clients should note that different markets may close at different times during the day due to local trading hours and time zones.')}</p>
            <p>{it.L('For forex quotes, the closing times are defined by the Company as shown in the market opening times section of the website. In the event of any dispute regarding market or settlement values, the decision of the Company shall be final and binding. Clients should note that certain markets (such as stock indices) are not open throughout the day and that trading may not be available when the markets are closed.')}</p>
            <p>{it.L('The calculation of the price to be paid (or the payout to be received) for financial contracts on this site at the time the financial contract is purchased or sold will be based on the Company\'s best estimate of market price movements and the expected level of interest rates, implied volatilities and other market conditions during the life of the financial contract, and is based on complex mathematics. The calculation will include a bias in favour of the Company. The financial contract prices (or the payout amounts) offered to clients speculating on market or index prices may substantially differ from prices available in the primary markets where commodities or contracts thereupon are traded, due to the bias favouring the Company in the price calculation system referred to above.')}</p>
            <p>{it.L('The charting data made available to clients by the Company is indicative only and may at times differ from the real market values. The Company\'s decision as to the calculation of a financial contract price will be final and binding. The Company allows the option to sell contracts before the expiry time of some contracts but will not be obliged to do so and can suspend this option depending on the current market conditions. Contracts may be amended when the underlying asset value is adjusted by corporate actions during the contract period.')}</p>
            <p>{it.L('Should a disruption that cannot be readily rectified by the Company occur in the data feeds, the Company reserves the right to refund the contract purchase.')}</p>
            <h2 data-anchor='trading-limits'>{it.L('Trading limits')}</h2>
            <p>{it.L('The Company reserves the right to have risk limits in place, which affect the trading limits of all clients trading, and may not be limited solely to instruments and contract types.')}</p>
            <p>{it.L('The Company may also impose volume trading limits on clients\' accounts at its sole discretion. Trading volume limits can be viewed in the Security & limits section of the client\'s account. If the account balance exceeds the maximum account size, then withdrawals must be made to bring the balance down to under this limit.')}</p>
            <p data-show='eucountry'>{it.L('Due to the responsibilities under responsible gaming, [_1] reserves the right to assess and safeguard the client\'s account by setting limits to the client\'s activity as deemed proportionate and necessary for their protection.', it.website_name)}</p>
        </p>
    </div>
);

export default TradingRules;
