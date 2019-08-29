import {Post} from "../../backend";
import {UpdateListAction, OpenPostAction, OpeningAction} from "../actions";
import {combineReducers, Reducer} from "redux";
import {AppState, PostState} from "../state";

export function openPostReducer(post: PostState, action: OpenPostAction): PostState {
    if (action.type === "OpenPost") {
        return action.post;
    }
    return post;
}

export function updatePostList(posts: Array<Post> | undefined = [], action: UpdateListAction): Array<Post> {
    if (action.type === 'UpdateList') {
        return action.posts;
    }
    return posts;
}

export function updateIsOpening(isOpening: boolean |undefined = false, action: OpeningAction): boolean {
    if (action.type === 'SetOpening') {
        return action.opening;
    }
    return isOpening as boolean;
}

export const reducer: Reducer<AppState> = combineReducers({
    postList: updatePostList,
    currentPost: openPostReducer,
    isOpening: updateIsOpening,
});