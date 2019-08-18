import {Command, EditorPlugin} from "./index";
import Draft, {DraftHandleValue, EditorState, RichUtils} from "draft-js";
import {StateChange} from "../Editor";
import Immutable from 'immutable';

export function createResetBlockAfterEnter(onChange: StateChange): EditorPlugin {
    return {
        handleKeyCommand(command: Command, editorState: EditorState, eventTimeStamp: number): DraftHandleValue {
            if (command !== 'split-block')
                return 'not-handled';

            // 对于list不生效
            if (isList(editorState)) {
                return 'not-handled';
            }

            // 必须在行末
            if (!isEnd(editorState)) {
                return 'not-handled';
            }
            let newState = createEmptyBlock(editorState);
            onChange(newState);
            return 'handled';
        }
    }
}

function isEnd(editorState: EditorState) {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // 有选择
    if (selection.getFocusOffset() !== selection.getAnchorOffset())
        return false;
    if (selection.getFocusKey() !== selection.getAnchorKey()) {
        return false;
    }

    let block = content.getBlockForKey(selection.getFocusKey());
    if (block.getLength() === selection.getFocusOffset()) {
        return true;
    }
    return false;
}
function isList(editorState: EditorState) {
    let blockType = RichUtils.getCurrentBlockType(editorState);
    return blockType === 'unordered-list-item' || blockType === 'ordered-list-item';
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