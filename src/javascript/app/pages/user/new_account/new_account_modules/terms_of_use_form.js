const getElementById = require('../../../../../_common/common_functions').getElementById;
const State = require('../../../../../_common/storage').State;

const TermsOfUseForm = (() => {
    const init = async (fields, real_account_signup_target) => {
        const landing_company = State.getResponse('landing_company');
        const lc_to_upgrade_to =
            landing_company[real_account_signup_target === 'maltainvest'
                ? 'financial_company'
                : 'gaming_company'
            ] || landing_company.financial_company;
        getElementById('lc-name').innerHTML = lc_to_upgrade_to.name;
        getElementById('lc-country').innerHTML = lc_to_upgrade_to.country;

        $('#pep_declaration_note_toggle').off('click').on('click', (e) => {
            e.stopPropagation();
            $('#pep_declaration_note_toggle').toggleClass('open');
            $('#pep_declaration_note').slideToggle();
        });

        fields.forEach(field => {
            getElementById(`${field.section}_section`).setVisibility(1);
            getElementById(`${field.id}_row`).setVisibility(1);
        });
    };

    return {
        init,
    };
})();

module.exports = TermsOfUseForm;
