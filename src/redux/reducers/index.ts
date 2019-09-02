import {Post} from "../../backend";
import {BaseAction, OpeningAction, OpenPostAction, UpdateListAction} from "../actions";
import {combineReducers, Reducer} from "redux";
import {AppStore, PostStore} from "../store";
import {createNewPostReducer} from "./post_reducers";
import {OrderedMap} from "immutable";

export function openPostReducer(post: PostStore | undefined, action: OpenPostAction): PostStore {
    if (action.type === "OpenPost") {
        return action.post;
    }
    if (post === undefined) {
        return null;
    }
    return post;
}

export function updatePostList(posts: OrderedMap<string, Post> | undefined = OrderedMap(), action: UpdateListAction): OrderedMap<string, Post> {
    if (action.type === 'UpdateList') {
        return action.posts;
    }
    return posts as OrderedMap<string, Post>;
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
    posts: updatePostList,
    currentPost: openPostReducer,
    isOpening: updateIsOpening,
});

export const reducer: Reducer<AppStore, any> = concatReducers([
    combinedReducer,
    createNewPostReducer,
]);