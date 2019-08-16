import {EditorState, DraftHandleValue, getDefaultKeyBinding} from "draft-js";
import * as React from "react";

export interface Plugin {
    handleKeyCommand?(command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue,

    handleBeforeInput?(chars: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue,

    keyBindingFn?(e: React.KeyboardEvent): string | null,
}

export function mergePlugins(plugins: Array<Plugin>): Plugin {
    return {
        handleKeyCommand(command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            const handled = plugins.some(plugin => {
                if (plugin.handleKeyCommand === undefined) {
                    return false;
                }
                let result = plugin.handleKeyCommand(command, editorState, eventTimeStamp);

                return result === 'handled';
            });
            return handled ? "handled" : "not-handled";
        },
        handleBeforeInput(chars: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            const handled = plugins.some(plugin => {
                if (plugin.handleBeforeInput === undefined) {
                    return false;
                }
                let result = plugin.handleBeforeInput(chars, editorState, eventTimeStamp);

                return result === 'handled';
            });
            return handled ? "handled" : "not-handled";
        },
        keyBindingFn(e: React.KeyboardEvent): string | null {
            for (let plugin of plugins) {
                if (plugin.keyBindingFn === undefined) {
                    continue;
                }
                let result = plugin.keyBindingFn(e);
                if (result == null) {
                    continue;
                }
                return result;
            }
            return getDefaultKeyBinding(e);
        }
    }
}

