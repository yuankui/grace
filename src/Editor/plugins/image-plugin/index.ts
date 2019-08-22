import {ContentBlock, EditorState} from "draft-js";
import {StateChange} from "../../Editor";
import {ImageBlock} from "./ImageBlock";

export function createImagePlugin(state: EditorState, onChange: StateChange) {
    return {
        blockRendererFn(block: ContentBlock): any {
            const type = block.getType();
            if (type === 'image') {
                return {
                    component: ImageBlock,
                    props: {
                        state,
                        onChange
                    },
                };
            }
        },
    }
}