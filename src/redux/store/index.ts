import {Post} from "../../backend";
import Immutable from 'immutable';
import {EditorState} from "draft-js";
import {createPostId} from "../utils";

export interface EditingPost {
    id: string,
    title: string,
    tags: Array<string>,
    editorState: EditorState,
}

export function createEmptyEditingPost(): EditingPost {
    return {
        id: createPostId(),
        title: '',
        tags: [],
        editorState: EditorState.createEmpty()
    }
}

export interface AppStore {
    currentPost: EditingPost,
    posts: Immutable.OrderedMap<string, Post>,
    editMode: boolean,
    isOpening: boolean,
}

export function createEmptyStore(): AppStore {
    return {
        currentPost: createEmptyEditingPost(),
        isOpening: false,
        editMode: false,
        posts: Immutable.OrderedMap<string, Post>(),
    }
}