import {Post} from "../../backend";
import {UpdateListAction, OpenPostAction} from "../actions";
import {combineReducers, Reducer} from "redux";
import {AppState} from "../state";

export function openPostReducer(post: Post | undefined, action: OpenPostAction): Post {
    if (action.type === "OpenPost") {
        return action.post;
    }
    // TODO tricky
    return post as Post;
}

export function updatePostList(posts: Array<Post> | undefined = [], action: UpdateListAction): Array<Post> {
    if (action.type === 'UpdateList') {
        return action.posts;
    }
    return posts;
}


export const reducer: Reducer<AppState> = combineReducers({
    postList: updatePostList,
    currentPost: openPostReducer,
});