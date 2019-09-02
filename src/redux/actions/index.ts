import {Post} from "../../backend";
import {PostStore} from "../store";
import {Action} from "redux";

export type Actions = "OpenPost" | "SavePost" | "UpdateList" | 'SetOpening' | string;

export interface BaseAction extends Action<string> {
    type: Actions,
}

export interface OpenPostAction extends BaseAction {
    post: PostStore,
}

export interface UpdateListAction extends BaseAction {
    posts: Array<Post>,
}

export interface OpeningAction extends BaseAction {
    opening: boolean,
}

export interface SavePostAction extends BaseAction {
    post: Post,
}

export function createSavePostAction(post: Post): SavePostAction {
    return {
        type: "SavePost",
        post
    };
}