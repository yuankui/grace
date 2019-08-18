import {
    ContentBlock,
    DraftHandleValue,
    DraftInlineStyle,
    DraftStyleMap,
    EditorState,
    KeyBindingUtil,
    RichUtils
} from "draft-js";
import {StateChange} from "../../Editor";
import {Command, EditorPlugin} from "../index";
import * as React from "react";

export function createCodePlugin(state: EditorState,onChange: StateChange): EditorPlugin {
    return {
        keyBindingFn(e: React.KeyboardEvent): string | null {
            if (KeyBindingUtil.hasCommandModifier(e) && e.key === 'e') {
                // 'e' == 93
                return 'code';
            }
            return null;
        },

        handleKeyCommand(command: Command, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            if (command === 'code') {
                let newState = RichUtils.toggleInlineStyle(editorState, 'code');
                onChange(newState);
                return "handled";
            }

            return 'not-handled';
        },
        customStyleMap: {
            'code': {
                background: '#ededeb',
                padding: 2,
                borderRadius: 5,
                color: '#ea5858'
            }
        }
    }
}