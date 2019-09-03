import {convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import uuid from "uuid";
import {AppStore, createEmptyStore} from "./store";

export function createPostId(): string {
    return uuid.v4();
}

export function createEmptyContent(): RawDraftContentState {
    return convertToRaw(EditorState.createEmpty().getCurrentContent());
}

export function initReducer(state: AppStore | undefined, action: any): AppStore {
    if (state !== undefined) {
        return state;
    }
    return createEmptyStore();
}