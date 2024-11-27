import { IKeyboard } from '../types/types.ts';

export const keyboard: IKeyboard = {
    rus: [
        [
            { code: 'KeyQ', key: 'й' },
            { code: 'KeyW', key: 'ц' },
            { code: 'KeyE', key: 'у' },
            { code: 'KeyR', key: 'к' },
            { code: 'KeyT', key: 'е' },
            { code: 'KeyY', key: 'н' },
            { code: 'KeyU', key: 'г' },
            { code: 'KeyI', key: 'ш' },
            { code: 'KeyO', key: 'щ' },
            { code: 'KeyP', key: 'з' },
            { code: 'BracketLeft', key: 'x' },
            { code: 'BracketRight', key: 'ъ' },
            { code: 'Backspace', key: 'Backspace' },
        ],
        [
            { code: 'KeyA', key: 'ф' },
            { code: 'KeyS', key: 'ы' },
            { code: 'KeyD', key: 'в' },
            { code: 'KeyF', key: 'а' },
            { code: 'KeyG', key: 'п' },
            { code: 'KeyH', key: 'р' },
            { code: 'KeyJ', key: 'о' },
            { code: 'KeyK', key: 'л' },
            { code: 'KeyL', key: 'д' },
            { code: 'Semicolon', key: 'ж' },
            { code: 'Quote', key: 'э' },
            { code: 'Enter', key: 'Enter' },
        ],
        [
            { code: 'KeyNum', key: '&123' },
            { code: 'KeyZ', key: 'я' },
            { code: 'KeyX', key: 'ч' },
            { code: 'KeyC', key: 'с' },
            { code: 'KeyV', key: 'м' },
            { code: 'KeyB', key: 'и' },
            { code: 'KeyN', key: 'т' },
            { code: 'KeyM', key: 'ь' },
            { code: 'Comma', key: 'б' },
            { code: 'Period', key: 'ю' },
            { code: 'Backquote', key: 'ё' },
            { code: 'KeyLang', key: 'RUS' },
        ],
        [{ code: 'Space', key: ' ' }],
    ],
    en: [
        [
            { code: 'KeyQ', key: 'q' },
            { code: 'KeyW', key: 'w' },
            { code: 'KeyE', key: 'e' },
            { code: 'KeyR', key: 'r' },
            { code: 'KeyT', key: 't' },
            { code: 'KeyY', key: 'y' },
            { code: 'KeyU', key: 'u' },
            { code: 'KeyI', key: 'i' },
            { code: 'KeyO', key: 'o' },
            { code: 'KeyP', key: 'p' },
            { code: 'Backspace', key: 'Backspace' },
        ],
        [
            { code: 'KeyA', key: 'a' },
            { code: 'KeyS', key: 's' },
            { code: 'KeyD', key: 'd' },
            { code: 'KeyF', key: 'f' },
            { code: 'KeyG', key: 'g' },
            { code: 'KeyH', key: 'h' },
            { code: 'KeyJ', key: 'j' },
            { code: 'KeyK', key: 'k' },
            { code: 'KeyL', key: 'l' },
            { code: 'Enter', key: 'Enter' },
        ],
        [
            { code: 'KeyNum', key: '&123' },
            { code: 'KeyZ', key: 'z' },
            { code: 'KeyX', key: 'x' },
            { code: 'KeyC', key: 'c' },
            { code: 'KeyV', key: 'v' },
            { code: 'KeyB', key: 'b' },
            { code: 'KeyN', key: 'n' },
            { code: 'KeyM', key: 'm' },
            { code: 'KeyLang', key: 'EN' },
        ],
        [{ code: 'Space', key: ' ' }],
    ],
    num: [
        [
            { code: 'Digit1', key: '1' },
            { code: 'Digit2', key: '2' },
            { code: 'Digit3', key: '3' },
        ],
        [
            { code: 'Digit4', key: '4' },
            { code: 'Digit5', key: '5' },
            { code: 'Digit6', key: '6' },
        ],
        [
            { code: 'Digit7', key: '7' },
            { code: 'Digit8', key: '8' },
            { code: 'Digit9', key: '9' },
        ],
        [
            { code: 'KeyLang', key: 'ABC' },
            { code: 'Digit0', key: '0' },
        ],
    ],
};