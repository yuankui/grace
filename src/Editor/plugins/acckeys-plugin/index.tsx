import {StateChange} from "../../Editor";
import {
    EditorState,
    getDefaultKeyBinding,
    DraftHandleValue,
    RichUtils
} from "draft-js";
import * as React from "react";


export function createAcckeysPlugin(onChange: StateChange) {
    return {
        keyBindingFn: function (e: React.KeyboardEvent): string | null {
            if (e.metaKey && e.key === '1') {
                return 'header-one';
            }
            return getDefaultKeyBinding(e)
        },

        handleKeyCommand(command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            if (command === 'header-one') {
                let state = RichUtils.toggleBlockType(editorState, command);
                onChange(state);
                return 'handled';
            }
            return 'not-handled';
        }
    }
}