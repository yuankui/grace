import Draft, {ContentBlock, DraftHandleValue, EditorState} from "draft-js";
import {StateChange} from "../../Editor";
import {ImageBlock} from "./ImageBlock";
import {EditorPlugin} from "../index";
import Immutable from "immutable";

export function createImagePlugin(state: EditorState, onChange: StateChange): EditorPlugin {
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
        handlePastedFiles(files: Array<Blob>): DraftHandleValue {
            console.log(files);

            for (let file of files) {
                let reader = new FileReader();
                reader.onload = () => {
                    const bytes = reader.result;
                    if (bytes == null) {
                        return;
                    }

                    // new block
                    const newBlock = new Draft.ContentBlock({
                        key: Draft.genKey(),
                        type: "image",
                        text: "",
                        characterList: Immutable.List(),
                        data: Immutable.fromJS(
                            {
                                url: bytes
                            }
                        )

                    });
                    const contentState = state.getCurrentContent();
                    const newBlockMap = contentState.getBlockMap().set(newBlock.getKey(), newBlock);
                    const newContent = Draft.ContentState
                        .createFromBlockArray(newBlockMap.toArray())
                        .set('selectionAfter', contentState.getSelectionAfter().merge({
                            anchorKey: newBlock.getKey(),
                            anchorOffset: 0,
                            focusKey: newBlock.getKey(),
                            focusOffset: 0,
                            isBackward: false,
                        })) as Draft.ContentState;


                    const newState = EditorState.push(state, newContent, 'apply-entity');
                    onChange(newState);
                };

                // read file
                reader.readAsDataURL(file);
            }

            return 'handled';
        }
    }
}