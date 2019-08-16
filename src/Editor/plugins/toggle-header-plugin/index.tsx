import {StateChange} from "../../Editor";
import {
    EditorState,
    getDefaultKeyBinding,
    DraftHandleValue,
    RichUtils
} from "draft-js";
import * as React from "react";

const map: any = {
    'command-h1': 'header-one',
    'command-h2': 'header-two',
    'command-h3': 'header-three',
    'command-h4': 'header-four',
    'command-h5': 'header-five',
    'command-h6': 'header-six',
};
export function createToggleHeaderPlugin(onChange: StateChange) {
    return {
        keyBindingFn: function (e: React.KeyboardEvent): string | null {
            // h1 ----> h6
            if (e.metaKey && 48+1 <= e.keyCode && e.keyCode <= 48 + 6) {
                return 'command-h' + e.key;
            }
            return getDefaultKeyBinding(e);
        },

        handleKeyCommand(command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            if (command.startsWith('command-h')) {
                const cmd = map[command];
                let state = RichUtils.toggleBlockType(editorState, cmd);
                onChange(state);
                return 'handled';
            }
            return 'not-handled';
        }
    }
}