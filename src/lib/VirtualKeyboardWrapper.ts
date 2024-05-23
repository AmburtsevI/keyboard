import type { actions } from "./types";

export const keyboardLayout: string[][] = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "bksp"],
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
	["z", "x", "c", "v", "b", "n", "m", ".", "-", "_"],
	["space", "left", "right"],
];


export const keyboardModel = (inputEl: HTMLInputElement, key: string) => {
	if (inputEl.selectionStart === null || inputEl.selectionEnd === null) {
		return;
	}

    /*
     * 
     * Диспатчеры ивентов, чтобы симулировать ввод с клавы
     * 
     */
    const dispatchKeyboardEvent = (eventType: string, key: string) => {
        const event = new KeyboardEvent(eventType, {
            key: key,
            bubbles: true,
            cancelable: true,
        })
        inputEl.dispatchEvent(event)
    }
    
    const dispatchInputEvent = (inputType: string, data?: string) => {
        const event = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            inputType: inputType,
            data: data || null,
        })
        inputEl.dispatchEvent(event)
    }

    /* * * * * * * * */

    /*
     *
     * Делаем фокус при клике на кнопку, чтобы показывался курсор
     * Для кусора юзаем selection(end/start), чтобы отслеживать его положение
     *     
     */

    inputEl.focus();
	let startCursorPos: number = inputEl.selectionStart;
	let endCursorPos: number = inputEl.selectionEnd;
	let currentValue = inputEl.value;

    /* * * * * * * * */


    /*
     *
     * Экшены для кликов по кнопке
     * 1. Кастомный ивент keydown, чтобы создать эмуляцию нажатия
     * 2. Манипуляция с value (ввод, удаление, перемещение), и возврат курсора на позицию после введенного 
     *    или вместо удаленного элемента в каждом ивенте(кроме перемещения)
     * 3. Передать тип ивента в диспатчер для InputEvent для отслеживания input элементом 
     * 4. Завершение действия по keyup с текущим нажатием 
     * 
     */
	let actions: actions = {
		bksp: () => {
            dispatchKeyboardEvent('keydown', 'Backspace')
            inputEl.value = currentValue.slice(0, startCursorPos - 1) + currentValue.slice(endCursorPos);
            inputEl.selectionStart = inputEl.selectionEnd = startCursorPos - 1;
            dispatchInputEvent('deleteContentBackward');
            dispatchKeyboardEvent('keyup', 'Backspace');
		},
		space: () => {
            dispatchKeyboardEvent('keydown', ' '),
	        inputEl.value = currentValue.slice(0, startCursorPos) + ' ' + currentValue.slice(endCursorPos);
            inputEl.selectionStart = inputEl.selectionEnd = startCursorPos + 1;
            dispatchInputEvent('insertText', ' '),
            dispatchKeyboardEvent('keyup', ' ')
		},
		left: () => {
            dispatchKeyboardEvent('keydown', 'ArrowLeft');
			let indexOfChar = Math.max(startCursorPos - 1, 0);
			inputEl.setSelectionRange(indexOfChar, indexOfChar);
            dispatchKeyboardEvent('keyup', 'ArrowLeft');
		},
		right: () => {
            dispatchKeyboardEvent('keydown', 'ArrowRight');
			let indexOfChar = Math.min(startCursorPos + 1, currentValue.length)
			inputEl.setSelectionRange(indexOfChar, indexOfChar);
            dispatchKeyboardEvent('keyup', 'ArrowRight');
		},
		default: () => {
            dispatchKeyboardEvent('keydown', key);
			let newCursorPos = startCursorPos + key.length;
            inputEl.value = currentValue.slice(0, startCursorPos) + key + currentValue.slice(endCursorPos);
            inputEl.selectionStart = inputEl.selectionEnd = newCursorPos;
            dispatchInputEvent('insertText', key);
			dispatchKeyboardEvent('keyup', key);
		},
	};

    if (actions[key]) {
        return actions[key]();
    } else {
        return actions.default()       
    }
};
