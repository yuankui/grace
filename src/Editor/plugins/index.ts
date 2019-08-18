import Draft, {
    EditorState,
    DraftHandleValue,
    getDefaultKeyBinding,
    DraftEditorCommand,
    ContentBlock,
    DraftStyleMap,
    DraftInlineStyle,
} from "draft-js";
import * as React from "react";

export type Command = DraftEditorCommand | string;

export interface EditorPlugin {
    handleKeyCommand?(command: Command, editorState: EditorState, eventTimeStamp: number): DraftHandleValue,

    handleBeforeInput?(chars: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue,

    keyBindingFn?(e: React.KeyboardEvent): string | null,

    customStyleMap?: DraftStyleMap,
}

function mergeMap(maps: Array<DraftStyleMap | undefined>): DraftStyleMap {
    if (maps == null) {
        return {};
    }
    let res = {};
    for (let map of maps) {
        if (map != null) {
            res = {...res, ...map};
        }
    }
    return res;
}

export function mergePlugins(plugins: Array<EditorPlugin>): EditorPlugin {

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
        },
        customStyleMap: mergeMap(plugins.map(p => p.customStyleMap).filter(p => p !== null))
    }
}

