import {Post} from "../../backend";
import {EditingPost, PostStore} from "../store";
import {Action} from "redux";
import uuid from "uuid";
import {OrderedMap} from "immutable";
import {EditorState} from "draft-js";

export type Actions = "OpenPost"
    | "SavePost"
    | "UpdatePost"
    | "CreateNewPost"
    | "UpdateList"
    | 'SetOpening'
    | 'UpdateEditingPost'
    | any;

export interface BaseAction extends Action {
    type: Actions,

    [props: string]: any,
}

export interface OpenPostAction extends BaseAction {
    post: PostStore,
}

export interface UpdateEditingPostAction extends BaseAction {
    editingPost: EditingPost,
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

export interface UpdateEditorStateAction extends BaseAction {
    state: EditorState,
}

export interface UpdatePostAction extends BaseAction {

}

export function createSavePostAction(post: Post): SavePostAction {
    return {
        type: "SavePost",
        post
    };
}

export function createUpdateEditingPostAction(post: EditingPost): UpdateEditingPostAction {
    return {
        type: 'UpdateEditingPost',
        editingPost: post,
    }
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