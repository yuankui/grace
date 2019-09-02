import {convertToRaw, EditorState, RawDraftContentState} from "draft-js";


export function createEmptyContent(): RawDraftContentState {
    return convertToRaw(EditorState.createEmpty().getCurrentContent());
}