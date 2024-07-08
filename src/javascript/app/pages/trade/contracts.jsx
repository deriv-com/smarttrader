import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Divider, DropdownItem, DropdownTitle } from '@deriv-com/quill-ui';
import Defaults, { PARAM_NAMES } from './defaults';
import { getElementById } from '../../../_common/common_functions';
import { triggerContractChange } from '../../hooks/events';

class Contracts extends React.Component {
    constructor (props) {
        super(props);
        const { contracts, contracts_tree, selected } = props;
        const formname = selected || Defaults.get(Defaults.PARAM_NAMES.FORM_NAME);
        this.references = {};
        this.el_contract = getElementById('contract');
        this.el_contract.value = formname;
        this.state = {
            contracts,
            contracts_tree,
            formname,
            open: false,
        };
    }

    componentDidMount () {
        document.body.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount () {
        document.body.removeEventListener('click', this.handleClickOutside);
    }

    /* eslint-disable no-undef */
    handleClickOutside = (e) => {
        if (this.references.wrapper
            && !this.references.wrapper.contains(e.target) && this.state.open) {
            this.closeDropDown();
        }
    };

    saveRef = (name, node) => { this.references[name] = node; };

    getCurrentType = () => {
        const { formname, contracts } = this.state;
        let type = '';
        this.state.contracts_tree.forEach((e) => {
            if (typeof e === 'object') {
                e[1].forEach((subtype) => {
                    if (subtype === formname) {
                        type = e[0];
                    }
                });
            } else if (e === formname) {
                type = e;
            }
        });

        return contracts[type];
    };

    getCurrentContract = () => {
        const { formname, contracts } = this.state;
        const max_char = window.innerWidth <= 767 ? 10 : 15;
        if ((contracts[formname] || '').length > max_char) {
            return `${contracts[formname].substr(0,max_char)}...`;
        }
        return contracts[formname];
    };

    onContractClick = (formname) => {
        if (formname === this.state.formname) { return; }
        // Notify for changes on contract.
        this.el_contract.value = formname;
        const event = new Event('change');
        this.el_contract.dispatchEvent(event);

        this.setState({ formname });
    };

    saveSelectedContract = (formname) => {
        Defaults.set(PARAM_NAMES.CONTRACT_NAME,this.state.contracts[formname]);

        triggerContractChange();
    };

    /* eslint-enable no-undef */
    render () {
        const {
            contracts,
            contracts_tree,
            formname,
        } = this.state;
        
        return (
            <div className='quill-market-dropdown-container'>
                <div className='quill-market-dropdown-item-container'>
                    { contracts_tree.map((contract, idx) => {
                        if (typeof contract === 'object') {
                            return (
                                <React.Fragment key={idx}>
                                    <DropdownTitle label={contracts[contract[0]]} />
                                    {contract[1].map((subtype, i) => {
                                        if (subtype === formname){
                                            this.saveSelectedContract(formname);
                                        }
                                        
                                        return (
                                            <DropdownItem
                                                key={i}
                                                onClick={this.onContractClick.bind(null, subtype)}
                                                label={contracts[subtype]}
                                                selected={subtype === formname}
                                                size='sm'
                                                className='contract-item-clickables'
                                            />);
                                    })}
                                    <Divider />
                                </React.Fragment>
                            );
                        }

                        if (contract === formname){
                            this.saveSelectedContract(formname);
                        }

                        return (
                            <React.Fragment key={idx}>
                                <DropdownTitle label={contracts[contract]} />
                                <DropdownItem
                                    onClick={this.onContractClick.bind(null, contract)}
                                    label={contracts[contract]}
                                    selected={contract === formname}
                                    size='sm'
                                    className='contract-item-clickables'
                                />
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        );
    }
}
/* eslint-disable react/no-render-return-value */
export const init = (contracts, contracts_tree, selected) => ReactDOM.render(
    <Contracts contracts={contracts} contracts_tree={contracts_tree} selected={selected} />,
    getElementById('contract_component')
);
/* eslint-enable react/no-render-return-value */

Contracts.propTypes = {
    contracts     : PropTypes.object,
    contracts_tree: PropTypes.array,
    selected      : PropTypes.string,
};

export default init;
