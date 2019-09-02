import {Post} from "../../backend";
import {PostStore} from "../store";
import {Action} from "redux";
import uuid from "uuid";
import {OrderedMap} from "immutable";

export type Actions = "OpenPost"
    | "SavePost"
    | "CreateNewPost"
    | "UpdateList"
    | 'SetOpening'
    | any;

export interface BaseAction extends Action {
    type: Actions,

    [props: string]: any,
}

export interface OpenPostAction extends BaseAction {
    post: PostStore,
}

export interface UpdateListAction extends BaseAction {
    posts: OrderedMap<string, Post>,
}

export interface OpeningAction extends BaseAction {
    opening: boolean,
}

export interface SavePostAction extends BaseAction {
    post: Post,
}

export interface CreateNewPostAction extends BaseAction {
    parentId: string | null,
}

export function createSavePostAction(post: Post): SavePostAction {
    return {
        type: "SavePost",
        post
    };
}

export function createCreateNewPostAction(parentId: string | null = null): CreateNewPostAction {
    return {
        type: "CreateNewPost",
        parentId,
    }
}

export function createPostId(): string {
    return uuid.v4();
}