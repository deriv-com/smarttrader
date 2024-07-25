const onlyNumericOnKeypress = (ev, optional_value) => {
    const key         = ev.which;
    const char        = String.fromCharCode(key);
    let array_of_char = [0, 8, 37, 39, 46]; // special keypresses (tab, esc), delete, backspace, arrow keys
    if (optional_value && optional_value.length > 0) {
        array_of_char = array_of_char.concat(optional_value);
    }
    if ((char === '.' && ev.target.value.indexOf(char) >= 0) ||
        (!/[0-9.]/.test(char) && array_of_char.indexOf(key) < 0) ||
        /['%]/.test(char)) { // similarity to arrows key code in some browsers
        ev.returnValue = false;
        ev.preventDefault();
    }
};

const handleNumeric = (event, regexString) => {

    let inputValue = event.target.value;
    const regex = new RegExp(regexString) || /[^0-9.]/g;

    // Remove characters that do not match the regex
    inputValue = inputValue.split('').filter((char, index, array) => {
        const tempValue = array.slice(0, index + 1).join('');
        return !regex.test(tempValue);
    }).join('');

    // Ensure only one sign character is allowed at the start
    if (inputValue.match(/[+-]/g) && inputValue.match(/[+-]/g).length > 1) {
        inputValue = inputValue.replace(/[+-]/g, '');
    }

    // Ensure only one decimal point is allowed
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
        inputValue = inputValue.replace(/\./g, (match, offset) => (offset === inputValue.indexOf('.') ? match : ''));
    }

    return inputValue;
};

module.exports = { onlyNumericOnKeypress, handleNumeric };
