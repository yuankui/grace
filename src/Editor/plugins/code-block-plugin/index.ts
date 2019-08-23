import {ContentBlock, EditorState} from "draft-js";
import {EditController, StateChange} from "../../Editor";
import {CodeBlock} from "./CodeBlock";
import {EditorPlugin} from "../index";
import './index.css';

export function createCodeBlockPlugin(state: EditorState, onChange: StateChange, controller: EditController): EditorPlugin {
    return {
        blockRendererFn(block: ContentBlock): any {
            const type = block.getType();
            if (type === 'grace-code-block') {
                return {
                    component: CodeBlock,
                    editable: false,
                    props: {
                        state,
                        onChange,
                        editorController: controller,
                    },
                };
            }
        },
    }
}