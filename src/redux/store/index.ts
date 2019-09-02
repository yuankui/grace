import {Post} from "../../backend";
import Immutable from 'immutable';

export type PostStore = Post | null;

export interface AppStore {
    currentPost: PostStore,
    posts: Immutable.OrderedMap<string, Post>,
    isOpening: boolean,
}

export function createEmptyStore(): AppStore {
    return {
        currentPost: null,
        isOpening: false,
        posts: Immutable.OrderedMap<string, Post>(),
    }
}