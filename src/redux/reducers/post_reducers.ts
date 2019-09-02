import {AppStore, createEmptyStore} from "../store";
import {CreateNewPostAction, createPostId} from "../actions";
import {createEmptyContent} from "../utils";
import {Post} from "../../backend";
import {EditorState} from "draft-js";

export function createNewPostReducer(store: AppStore | undefined, action: CreateNewPostAction): AppStore {
    if (store === undefined) {
        return createEmptyStore();
    }
    if (action.type !== 'CreateNewPost') {
        return store;
    }

    let newPost = {
        id: createPostId(),
        content: createEmptyContent(),
        editorState: EditorState.createEmpty(),
        tags: [],
        children: [],
        title: "未命名",
        parentId: null,
    };

    let parent: Post | undefined = undefined;
    if (action.parentId != null) {
        parent = store.posts.get(action.parentId);
    }

    if (parent === undefined) {
        return {
            ...store,
            currentPost: newPost,
            posts: store.posts.set(newPost.id, newPost)
        }
    } else {
        const newParent: Post = {
            ...parent,
            children: [...parent.children, newPost]
        };
        return {
            ...store,
            currentPost: newPost,
            posts: store.posts.set(parent.id, newParent)
        }
    }
}