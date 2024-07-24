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

const handleNumeric = (event, regex) => {
    let inputValue = event.target.value;
    const numAndDecimalReg = regex || /[^0-9.]/g;
    inputValue = inputValue.replace(numAndDecimalReg, '');

    inputValue = inputValue.replace(numAndDecimalReg, '');

    // Ensure only one decimal point is allowed
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
        inputValue = inputValue.replace(/\.+$/, '');
    }

    event.target.value = inputValue;

    return event.target.value;
};

module.exports = { onlyNumericOnKeypress, handleNumeric };
