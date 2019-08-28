import {Post} from "../../backend";

export interface AppState {
    currentPost: Post,
    postList: Array<Post>,
}