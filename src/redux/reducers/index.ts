import {Post} from "../../backend";
import {UpdateListAction, OpenPostAction, OpeningAction} from "../actions";
import {combineReducers, Reducer} from "redux";
import {AppStore, PostStore} from "../store";

export function openPostReducer(post: PostStore | undefined, action: OpenPostAction): PostStore {
    if (action.type === "OpenPost") {
        return action.post;
    }
    if (post === undefined) {
        return null;
    }
    return post;
}

export function updatePostList(posts: Array<Post> | undefined = [], action: UpdateListAction): Array<Post> {
    if (action.type === 'UpdateList') {
        return action.posts;
    }
    return posts as Array<Post>;
}

export function updateIsOpening(isOpening: boolean |undefined = false, action: OpeningAction): boolean {
    if (action.type === 'SetOpening') {
        return action.opening;
    }
    return isOpening as boolean;
}

export const reducer: Reducer<AppStore> = combineReducers({
    postList: updatePostList,
    currentPost: openPostReducer,
    isOpening: updateIsOpening,
});