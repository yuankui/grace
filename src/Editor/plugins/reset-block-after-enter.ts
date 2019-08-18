import {Command, EditorPlugin} from "./index";
import Draft, {DraftHandleValue, EditorState} from "draft-js";
import {StateChange} from "../Editor";
import Immutable from 'immutable';

export function createResetBlockAfterEnter(onChange: StateChange): EditorPlugin {
    return {
        handleKeyCommand(command: Command, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            if (command === 'split-block') {
                let newState = createEmptyBlock(editorState);
                onChange(newState);
                return 'handled';
            }

            return 'not-handled';
        }
    }
}


/**
 * copy from https://stackoverflow.com/questions/49453635/draftjs-reset-blocktype-after-return?rq=1
 * @param editorState
 */
function createEmptyBlock(editorState: Draft.EditorState) {
    const newBlock = new Draft.ContentBlock({
        key: Draft.genKey(),
        type: "unstyled",
        text: "",
        characterList: Immutable.List()
    });

    const contentState = editorState.getCurrentContent();
    const newBlockMap = contentState.getBlockMap().set(newBlock.getKey(), newBlock);

    return Draft.EditorState.push(
        editorState,
        Draft.ContentState
            .createFromBlockArray(newBlockMap.toArray())
            .set('selectionAfter', contentState.getSelectionAfter().merge({
                anchorKey: newBlock.getKey(),
                anchorOffset: 0,
                focusKey: newBlock.getKey(),
                focusOffset: 0,
                isBackward: false,
            })) as Draft.ContentState,
        "split-block"
    )
}