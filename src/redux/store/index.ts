import {Post} from "../../backend";

export type PostStore = Post | null;

export interface AppStore {
    currentPost: PostStore,
    postList: Array<Post>,
    isOpening: boolean,
}