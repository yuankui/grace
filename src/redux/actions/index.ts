import {Post} from "../../backend";
import {PostState} from "../state";
import {Action} from "redux";

export type Actions = "OpenPost" | "SavePost" | "UpdateList" | 'SetOpening';

export interface BaseAction extends Action{
    type: Actions,
}

export interface OpenPostAction extends BaseAction {
    post: PostState,
}

export interface UpdateListAction extends BaseAction {
    posts: Array<Post>,
}

export interface OpeningAction extends BaseAction {
    opening: boolean,
}

