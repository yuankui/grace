import {Post} from "../../backend";
import {
    BaseAction,
    OpeningAction,
    UpdateEditingPostAction,
    UpdateEditorStateAction,
    UpdateListAction
} from "../actions";
import {combineReducers, Reducer} from "redux";
import {AppStore, createEmptyEditingPost, EditingPost} from "../store";
import {createNewPostReducer} from "./post_reducers";
import {OrderedMap} from "immutable";
import {EditorState} from "draft-js";


export function updateEditingPostReducer(post: EditingPost | undefined, action: UpdateEditingPostAction): EditingPost {
    if (action.type === "OpenPost") {
        return action.post;
    }
    if (post === undefined) {
        return createEmptyEditingPost();
    }
    return post;
}

export function updateEditorStateReducer(state: EditorState | undefined, action: UpdateEditorStateAction): EditorState {
    if (action.type === 'UpdateEditorState') {
        return action.state;
    }
    if (state === undefined) {
        return EditorState.createEmpty();
    }
    return state;
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
    return function (state: S | undefined, action: A): S {
        for (let reducer of reducers) {
            state = reducer(state, action);
        }
        return state as S;
    }
}

const combinedReducer: Reducer<AppStore, BaseAction> = combineReducers({
    posts: updatePostList,
    currentPost: updateEditingPostReducer,
    isOpening: updateIsOpening,
});

export const reducer: Reducer<AppStore, any> = concatReducers([
    combinedReducer,
    createNewPostReducer,
]);