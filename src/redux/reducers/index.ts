import {Post} from "../../backend";
import {UpdateListAction, OpenPostAction, OpeningAction, BaseAction} from "../actions";
import {Action, combineReducers, Reducer} from "redux";
import {AppStore, PostStore} from "../store";
import {createNewPostReducer} from "./post_reducers";

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

export function updateIsOpening(isOpening: boolean | undefined = false, action: OpeningAction): boolean {
    if (action.type === 'SetOpening') {
        return action.opening;
    }
    return isOpening as boolean;
}

function concatReducers<S, A extends BaseAction>(reducers: Array<Reducer<S, A>>): Reducer<S, A> {
    return function (state: S |undefined, action: A): S {
        for (let reducer of reducers) {
            state = reducer(state, action);
        }
        return state as S;
    }
}

const combinedReducer: Reducer<AppStore, BaseAction> = combineReducers({
    postList: updatePostList,
    currentPost: openPostReducer,
    isOpening: updateIsOpening,
});

export const reducer: Reducer<AppStore, any> = concatReducers([
    combinedReducer,
    createNewPostReducer,
]);