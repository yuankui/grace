import {Post} from "../../backend";

export type Actions = "OpenPost" | "SavePost" | "UpdateList";

export interface Action {
    type: Actions,
}

export interface OpenPostAction extends Action {
    post: Post,
}

export interface UpdateListAction extends Action {
    posts: Array<Post>,
}

export interface SavePostAction extends Action {
    post: Post,
}

export function openPost(post: Post): OpenPostAction {
    return {
        type: "OpenPost",
        post,
    }
}

export function refreshList(posts: Array<Post>): UpdateListAction {
    return {
        type: "UpdateList",
        posts
    }
}

export function savePost(post: Post): SavePostAction {
    return {
        type: "SavePost",
        post
    };
}