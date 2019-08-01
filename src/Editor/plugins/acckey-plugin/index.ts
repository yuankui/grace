import Draft, {EditorState, getDefaultKeyBinding, RichUtils,DraftHandleValue} from "draft-js";

interface KeyCommand {
    command: string,
    key: KeyEvent,
}

interface KeyEvent {
    readonly altKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly key: string;
}
interface StyleAction {
    type: 'inline' | 'block';
    name: string;
}

interface ActionMap {
    [props: string]: StyleAction;
}

export interface EditorStateHandler {
    (state: EditorState): void;
}

let styleCommandMap: ActionMap = {
    'header-one': {
        type: 'block',
        name: 'header-one',
    },
    'header-two': {
        type: 'block',
        name: "header-two"
    },
    'header-three': {
        type: 'block',
        name: "header-three"
    },
    'header-four': {
        type: 'block',
        name: "header-four"
    },
    'header-five': {
        type: 'block',
        name: "header-five"
    },
    'header-six': {
        type: 'block',
        name: "header-six"
    },
    'BOLD': {
        type: 'inline',
        name: 'BOLD',
    },
    'ITALIC': {
        type: 'inline',
        name: 'ITALIC',
    }
};

const keyCommands: Array<KeyCommand> = [
    {
        command: 'header-one',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '1',
        },
    },
    {
        command: 'header-two',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '2',
        },
    },
    {
        command: 'header-three',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '3',
        },
    },
    {
        command: 'header-four',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '4',
        },
    },
    {
        command: 'header-five',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '5',
        },
    },
    {
        command: 'header-six',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: false,
            metaKey: true,
            key: '6',
        },
    },
    {
        command: 'BOLD',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: true,
            metaKey: false,
            key: 'b',
        },
    },
    {
        command: 'ITALIC',
        key: {
            altKey: false,
            shiftKey: false,
            ctrlKey: true,
            metaKey: false,
            key: 'i',
        },
    },

];

function keyEqual(key1: KeyEvent, key2: KeyEvent) {
    if (key1.altKey !== key2.altKey) return false;
    if (key1.ctrlKey !== key2.ctrlKey) return false;
    if (key1.metaKey !== key2.metaKey) return false;
    if (key1.shiftKey !== key2.shiftKey) return false;
    return key1.key === key2.key;
}

export function createAcckeyPlugin(onChange: EditorStateHandler) {
    return {
        keyBindingFn: (e: any | KeyEvent): any => {
            for (let keyCommand of keyCommands) {
                if (keyEqual(e, keyCommand.key)) {
                    return keyCommand.command;
                }
            }
            return getDefaultKeyBinding(e);
        },
        handleKeyCommand: (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
            let action = styleCommandMap[command];
            if (action != null) {
                if (action.type === 'block') {
                    onChange(RichUtils.toggleBlockType(editorState, action.name));
                    return 'handled';
                } else if (action.type === 'inline') {
                    onChange(RichUtils.toggleInlineStyle(editorState, action.name));
                    return 'handled';
                }
            }
            return "not-handled";
        },
    }
}
