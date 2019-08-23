import {ContentBlock, EditorState} from "draft-js";
import {StateChange} from "../../Editor";
import {CodeBlock} from "./CodeBlock";
import {EditorPlugin} from "../index";
import './index.css';

export function createCodeBlockPlugin(state: EditorState, onChange: StateChange): EditorPlugin {
    return {
        blockRendererFn(block: ContentBlock): any {
            const type = block.getType();
            if (type === 'grace-code-block') {
                return {
                    component: CodeBlock,
                    props: {
                        state,
                        onChange
                    },
                };
            }
        },
    }
}