import Draft, {ContentBlock, ContentState, EditorState, DraftHandleValue, RichUtils, Modifier} from "draft-js";
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
                // new block
                const newBlock = new Draft.ContentBlock({
                    key: Draft.genKey(),
                    type: "image",
                    text: "",
                    characterList: Immutable.List()
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

                const contentStateWithEntity = contentState.createEntity(
                    'image',
                    'IMMUTABLE',
                    {url: "https://www.baidu.com/img/bd_logo1.png?where=super"}
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

                const content = Modifier.applyEntity(newContent, state.getSelection(), entityKey);

                const newState = EditorState.push(state, content, 'apply-entity');
                onChange(newState);
            }

            return 'handled';
        }
    }
}