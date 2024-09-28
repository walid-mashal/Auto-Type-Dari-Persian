/*
Auto Type Dari/Persian
Version: 1.1
This module enables typing Dari/Persian in web forms without changing system language settings.
The layout is based on the Afghanistan Official Dari Keyboard Layout.
*/

let shiftIsPressed = false;
let ctrlIsPressed = false;

const dariKeyboard = {
    dariCodeMap: {
        '104': 'ا', 'shift+71': 'أ', '102': 'ب',  
        'shift+72': 'آ', 'shift+76': 'ة', '106': 'ت', '101': 'ث', 
        '91': 'ج', '112': 'ح', '105': 'ه', '111': 'خ', 'shift+80': '[', 
        'shift+90': 'ئ', 'shift+86': 'ء', '93': 'چ', '110': 'د', '98': 'ذ', 
        '118': 'ر', '99': 'ز', 'shift+67': 'ژ', 'shift+77': 'ؤ', '44': 'و', 
        '115': 'س', '97': 'ش', '119': 'ص', '113': 'ض', 'shift+88': 'ط', 
        '122': 'ظ', '117': 'ع', '121': 'غ', '116': 'ف', '114': 'ق', 
        '59': 'ک', '39': 'گ', '108': 'م', '107': 'ن', '103': 'ل', '100': 'ی', 
        'shift+68': 'ي', '32': ' ', '49': '۱', '50': '۲', '51': '۳', 
        '52': '۴', '53': '۵', '54': '۶', '55': '۷', '56': '۸', '57': '۹', 
        '48': '۰', ',': ',', '-': '-', 'shift+74' : 'ة', 'shift+70' : 'إ', 
        'shift+90' : 'ك', 'shift+79' : ']', '120' : 'ط', '109' : 'پ'
    },

    init() {
        const elements = document.querySelectorAll('input[type="text"][lang="dr"], textarea[lang="dr"], div[contenteditable="true"][lang="dr"]');
        elements.forEach((element) => this.bindDariTyping(element));
    },

    bindDariTyping(element) {
        element.style.textAlign = 'right';
        element.style.direction = 'rtl';

        element.addEventListener('keypress', (e) => this.handleKeyPress(e, element));
        element.addEventListener('keydown', this.handleKeyDown);
        element.addEventListener('keyup', this.handleKeyUp);
    },

    handleKeyDown(e) {
        if (e.key === 'Shift') shiftIsPressed = true;
        if (e.ctrlKey) ctrlIsPressed = true;
    },

    handleKeyUp(e) {
        if (e.key === 'Shift') shiftIsPressed = false;
        if (!e.ctrlKey) ctrlIsPressed = false;
    },

    handleKeyPress(e, element) {
        if (!ctrlIsPressed) {
            const keyCode = e.charCode || e.keyCode;
            const keyStr = shiftIsPressed ? 'shift+' + keyCode : keyCode.toString();
            const dariChar = this.dariCodeMap[keyStr];

            if (dariChar) {
                this.insertTextAtCaret(element, dariChar);
                e.preventDefault();
            }
        }
    },

    insertTextAtCaret(element, char) {
        if (!element.isContentEditable) {
            const { selectionStart, selectionEnd, value } = element;
            element.value = value.slice(0, selectionStart) + char + value.slice(selectionEnd);
            element.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else {
            const sel = window.getSelection();
            const { anchorOffset, focusOffset } = sel;
            const content = element.textContent;
            element.textContent = content.slice(0, anchorOffset) + char + content.slice(focusOffset);

            const range = document.createRange();
            range.setStart(element.firstChild, anchorOffset + 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
};

window.addEventListener('load', dariKeyboard.init.bind(dariKeyboard));
