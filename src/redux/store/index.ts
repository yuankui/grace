import {Post} from "../../backend";
import Immutable from 'immutable';
import {EditorState} from "draft-js";
import {createPostId} from "../actions";

export type PostStore = Post | null;

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
    isOpening: boolean,
}

export function createEmptyStore(): AppStore {
    return {
        currentPost: createEmptyEditingPost(),
        isOpening: false,
        posts: Immutable.OrderedMap<string, Post>(),
    }
}