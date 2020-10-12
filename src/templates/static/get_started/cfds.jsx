import React from 'react';
import { Section, HeaderSecondary, ListStrong, BuySellImage, MtBox, NavButtons, MTAccountOpeningButton } from './common.jsx';
import { List, Table } from '../../_common/components/elements.jsx';

const hundredth       = '0.01';
const thousandth      = '0.001';
const tenth           = '0.10';
const two_tenth       = '0.20';
const three_tenth     = '0.30';
const five_tenth      = '0.50';
const five_thousandth = '0.005';
const three           = '3.00';

const Cfds = () => (
    <div className='static_full get-started'>
        <h1>{it.L('MetaTrader 5')}</h1>
        <div className='gr-row'>
            <div className='gr-3 gr-hide-m sidebar-container'>
                <div className='sidebar'>
                    <List
                        id='sidebar-nav'
                        items={[
                            { id: 'what-cfds-trading',      href: '#what-cfds-trading',      text: it.L('What is CFD trading') },
                            { id: 'how-trade-cfds',         href: '#how-trade-cfds',         text: it.L('How to trade CFDs') } ,
                            { id: 'margin-policy',          href: '#margin-policy',          text: it.L('CFD margin policy') },
                            { id: 'contract-specification', href: '#contract-specification', text: it.L('CFD contract specifications') },
                        ]}
                    />
                </div>

                <MTAccountOpeningButton />
            </div>
            <div className='gr-9 gr-12-m'>
                <Section id='what-cfds-trading' header={it.L('What is CFD trading')}>
                    <p>{it.L('A Contract for difference (CFD) is a financial derivative that allows you to potentially profit by speculating on the rise or fall of an underlying asset, without actually owning that asset.')}</p>
                    <p>{it.L('The movement of the underlying asset determines your profit or loss – depending on the position that you have taken.')}</p>
                    <HeaderSecondary header={it.L('Advantages of CFD trading')} />
                    <ul className='checked'>
                        <ListStrong header={it.L('Trade with leverage')}  text={it.L('Trade a larger position than your exisiting capital.')} />
                        <ListStrong header={it.L('Hedge your portfolio')} text={it.L('Offset potential losses to your investment portfolio by hedging with CFDs.')} />
                        <ListStrong header={it.L('Go long and short')}    text={it.L('Trade long and short positions, depending on your preferred strategy.')} />
                    </ul>

                    <HeaderSecondary header={it.L('What you can trade with CFDs')} />
                    <p>{it.L('Contracts for difference (CFDs) allow you to speculate on a number of markets, including indices, shares, and commodities. At [_1], we offer popular cash indices, cryptocurrencies, as well as proprietary Synthetic Indices that simulate market movement.', it.website_name)}</p>
                </Section>

                <Section id='how-trade-cfds' header={it.L('How to trade CFDs')}>
                    <p>{it.L('New to CFD trading? We explain a few basics that all CFD traders need to know before they start trading.')}</p>

                    <HeaderSecondary header={it.L('When to buy and sell')} />
                    <p>{it.L('When you are trading CFDs, you can choose to open a buy position (if you think that the price will rise) or a sell position (if you think that the price will fall).')}</p>
                    <BuySellImage />
                    <p>{it.L('Let\'s use the US 100 index as an example:')}</p>
                    <p>{it.L('If you decide to buy or \'go long\' on the US 100 index, your profit will continue to increase as long as the price of the US 100 index keeps rising. However, if the price falls, the losses you incur will also increase.')}</p>
                    <p>{it.L('The opposite is true if you decide to sell or \'go short\' on the US 100 index. This means that your profit will continue to increase as long as the price of the US 100 index keeps falling. However, if the price rises, the losses you incur will also increase.')}</p>

                    <HeaderSecondary header={it.L('How to calculate your profits and losses')} />
                    <p>{it.L('Let\'s say a US 100 contract is worth 1 USD per point in the underlying asset. If you decide to \'go long\' on the US 100, and the asset price rises by 10 points, that represents a 10 USD profit for you.')}</p>
                    <p>{it.L('However, if the asset price falls by 10 points, that represents a 10 USD loss for you.')}</p>
                    <p>{it.L('To learn more, please read our [_1]CFD contract specifications[_2].', '<a href="#contract-specification">', '</a>')}</p>

                    <HeaderSecondary header={it.L('How to close a position')} />
                    <p>{it.L('When you decide to close an open contract, you only need to choose “Close Position” option from context menu.')}</p>
                </Section>

                <Section id='margin-policy' header={it.L('CFD margin policy')}>
                    <p>{it.L('Margin allows you to trade on leverage – giving you the same level of market exposure using much less capital.')}</p>
                    <p>{it.L('For example, if you wanted to purchase 100 units of a particular asset trading at 50 USD per unit through a traditional broker, it would cost you 5,000 USD for this transaction.')}</p>
                    <p>{it.L('With leverage, you can purchase 100 units of the same asset at a fraction of the cost.')}</p>

                    <HeaderSecondary header={it.L('How to calculate margin')} />
                    <p>{it.L('You can determine the margin for our CFDs by using the formula below:')}</p>
                    <MtBox icon_1='mr1-icon' icon_2='mr2-icon' text={it.L('For example, if you buy one lot of an underlying asset at a price of 20,000 USD and a margin rate of 0.01, the margin required to purchase that one lot will be calculated as follows:')} />

                    <HeaderSecondary header={it.L('What\'s a margin call and how is it applied')} />
                    <p>{it.L('Equity is the sum of your balance and floating profit and loss (PnL). Margin level is the ratio of equity to margin. When that ratio reaches a specified percentage (usually 100%), your account will be placed under margin call. This does not affect your ability to open new positions; it serves to alert you that your floating PnL is moving lower. However, it is recommended to add funds to your account in order to keep your positions open. Alternatively, you may close losing positions.')}</p>

                    <HeaderSecondary header={it.L('What\'s a stop out level and how is it applied')} />
                    <p>{it.L('If your margin level reaches an even lower level (usually 50%), it will reach the stop out level where it is unable to sustain an open position. This will lead to some, or all your open positions being forcibly closed (also known as "forced liquidation").')}</p>
                    <p>{it.L('When your account hits the forced liquidation level, your orders and positions are forcibly closed in the following sequence:')}</p>
                    <ol>
                        <li>{it.L('We delete an order with the largest margin reserved.')}</li>
                        <li>{it.L('If your margin level is still under the stop out level, your next order will be deleted. However, orders without margin requirements will not be deleted.')}</li>
                        <li>{it.L('If your margin level is still under the stop out level, we will close an open position with the largest loss.')}</li>
                        <li>{it.L('We will continue to close open positions until your margin level becomes higher than the stop out level.')}</li>
                    </ol>
                </Section>

                <Section id='contract-specification' header={it.L('CFD contract specifications')}>
                    <HeaderSecondary header={it.L('Cash indices')} />
                    <Table
                        scroll
                        data={{
                            thead: [[
                                { text: it.L('Symbol'),         className: 'gr-padding-10 w-148' },
                                { text: it.L('Description'),    className: 'gr-padding-10' },
                                { text: it.L('Lot size'),       className: 'gr-padding-10 w-112' },
                                { text: it.L('Minimum volume'), className: 'gr-padding-10 w-80' },
                                { text: it.L('Volume step'),    className: 'gr-padding-10 w-80' },
                            ]],
                            tbody: [
                                [{ text: 'DAX_30' }, { text: 'Germany 30 Cash index' }, { text: '1' }, { text: tenth }, { text: tenth }],
                            ],
                        }}
                    />

                    <HeaderSecondary header={it.L('Synthetic indices')} />
                    <Table
                        scroll
                        data={{
                            thead: [[
                                { text: it.L('Symbol'),         className: 'gr-padding-10 w-262' },
                                { text: it.L('Lot size'),       className: 'gr-padding-10' },
                                { text: it.L('Minimum volume'), className: 'gr-padding-10 w-80' },
                                { text: it.L('Volume step'),    className: 'gr-padding-10 w-80' },
                            ]],
                            tbody: [
                                [{ text: 'Volatility 10 index'       }, { text: '1' }, { text: three_tenth     }, { text: hundredth }],
                                [{ text: 'Volatility 25 index'       }, { text: '1' }, { text: five_tenth      }, { text: hundredth }],
                                [{ text: 'Volatility 50 index'       }, { text: '1' }, { text: three           }, { text: hundredth }],
                                [{ text: 'Volatility 75 index'       }, { text: '1' }, { text: thousandth      }, { text: thousandth }],
                                [{ text: 'Volatility 100 index'      }, { text: '1' }, { text: two_tenth       }, { text: hundredth }],
                                [{ text: 'Volatility 10 (1s) index'  }, { text: '1' }, { text: two_tenth       }, { text: hundredth }],
                                [{ text: 'Volatility 25 (1s) index'  }, { text: '1' }, { text: five_thousandth }, { text: thousandth }],
                                [{ text: 'Volatility 50 (1s) index'  }, { text: '1' }, { text: five_thousandth }, { text: thousandth }],
                                [{ text: 'Volatility 75 (1s) index'  }, { text: '1' }, { text: five_thousandth }, { text: thousandth }],
                                [{ text: 'Volatility 100 (1s) index' }, { text: '1' }, { text: tenth           }, { text: hundredth }],
                            ],
                        }}
                    />

                    <HeaderSecondary header={it.L('Crash/Boom indices')} />
                    <Table
                        scroll
                        data={{
                            thead: [[
                                { text: it.L('Symbol'),         className: 'gr-padding-10 w-262' },
                                { text: it.L('Lot size'),       className: 'gr-padding-10' },
                                { text: it.L('Minimum volume'), className: 'gr-padding-10 w-80' },
                                { text: it.L('Volume step'),    className: 'gr-padding-10 w-80' },
                            ]],
                            tbody: [
                                [{ text: 'Crash 1000 index' }, { text: '1' }, { text: two_tenth }, { text: hundredth }],
                                [{ text: 'Boom 1000 index'  }, { text: '1' }, { text: two_tenth }, { text: hundredth }],
                                [{ text: 'Crash 500 index'  }, { text: '1' }, { text: two_tenth }, { text: hundredth }],
                                [{ text: 'Boom 500 index'   }, { text: '1' }, { text: two_tenth }, { text: hundredth }],
                            ],
                        }}
                    />

                    <HeaderSecondary header={it.L('Step indices')} />
                    <Table
                        scroll
                        data={{
                            thead: [[
                                { text: it.L('Symbol'),         className: 'gr-padding-10 w-262' },
                                { text: it.L('Lot size'),       className: 'gr-padding-10' },
                                { text: it.L('Minimum volume'), className: 'gr-padding-10 w-80' },
                                { text: it.L('Volume step'),    className: 'gr-padding-10 w-80' },
                            ]],
                            tbody: [
                                [{ text: 'Step index' }, { text: '10' }, { text: tenth }, { text: hundredth }],
                            ],
                        }}
                    />
                    
                    <HeaderSecondary header={it.L('Range break indices')} />
                    <Table
                        scroll
                        data={{
                            thead: [[
                                { text: it.L('Symbol'),         className: 'gr-padding-10 w-262' },
                                { text: it.L('Lot size'),       className: 'gr-padding-10' },
                                { text: it.L('Minimum volume'), className: 'gr-padding-10 w-80' },
                                { text: it.L('Volume step'),    className: 'gr-padding-10 w-80' },
                            ]],
                            tbody: [
                                [{ text: 'Range break 100 index' }, { text: '1' }, { text: hundredth }, { text: hundredth }],
                                [{ text: 'Range break 200 index' }, { text: '1' }, { text: hundredth }, { text: hundredth }],
                            ],
                        }}
                    />

                    <HeaderSecondary header={it.L('How to read the table above')} />
                    <p>{it.L('A Contract for difference (CFD) is a derivative contract that allows you to profit by speculating on the rise or fall of an underlying asset. Your profit and loss is calculated through the difference in the buy and sell prices of the underlying asset.')}</p>
                    <p>{it.L('Each time you open a position on an index symbol, you can start with a minimum volume transaction as indicated in the table above.')}</p>
                    <p><strong>{it.L('Crash/boom indices')}</strong></p>
                    <p>{it.L('With Crash 1000 (500) index, there\'s an average of one drop in the price series that occurs at anytime within 1000 (500) ticks.')}</p>
                    <p>{it.L('With Boom 1000 (500) index, there\'s an average of one spike in the price series that occurs at anytime within 1000 (500) ticks.')}</p>
                    <p><strong>{it.L('Step indices')}</strong></p>
                    <p>{it.L('With Step index, there is equal probability of up/down movement in the price series with fixed step size of 0.1.')}</p>
                    <p><strong>{it.L('Range break indices')}</strong></p>
                    <p>{it.L('Range break index fluctuates within a range between an upper and lower price level, also known as borders. When it hits either border, the index occasionally breaks through the range with a jump or crash, creating a new range. There are two types:')}</p>
                    <p>{it.L('Range break 100 breaks through the range on average once every 100 times that it hits the border.')}</p>
                    <p>{it.L('Range break 200 breaks through the range on average once every 200 times that it hits the border.')}</p>

                    <HeaderSecondary header={it.L('Important notes on our swap rates (overnight funding)')} />
                    <p>{it.L('If you keep any positions open overnight, an interest adjustment will be made to your trading account as indication of the cost required to keep your position open.')}</p>
                    <p>{it.L('The interest adjustment is calculated in annual base for long and short positions according to the formula: (current price*contract size*volume in lots*specified swap size/100)/360.')}</p>
                    <p>{it.L('Please take note that our swap rate also depends on the time and days you hold your positions open.')}</p>
                </Section>
                <NavButtons parent='mt5' section='cfds' />
            </div>
        </div>
    </div>
);

export default Cfds;
