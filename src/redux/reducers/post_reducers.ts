import {AppStore, createEmptyStore} from "../store";
import {CreateNewPostAction, createPostId} from "../actions";
import {createEmptyContent} from "../utils";

export function createNewPostReducer(store: AppStore | undefined, action: CreateNewPostAction): AppStore {
    if (store === undefined) {
        return createEmptyStore();
    }
    if (action.type !== 'CreateNewPost') {
        return store;
    }

    return {
        ...store,
        currentPost: {
            id: createPostId(),
            content: createEmptyContent(),
            tags: [],
            children: [],
            title: "未命名",
            parentId: null,
        }
    }
}