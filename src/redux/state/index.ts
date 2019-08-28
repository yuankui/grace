import {Post} from "../../backend";

export type PostState = Post | undefined;

export interface AppState {
    currentPost: PostState,
    postList: Array<Post> |undefined,
    isOpening: boolean,
}