import {DraftHandleValue, EditorState, KeyBindingUtil, RichUtils} from "draft-js";
import {Command, EditorPlugin} from "./index";
import * as React from "react";
import {StateChange} from "../Editor";

export function createInlineHotkey(state: EditorState,onChange: StateChange): EditorPlugin {
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
        }
    }
}