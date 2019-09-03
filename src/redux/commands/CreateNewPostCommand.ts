import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {createEmptyContent, createPostId} from "../utils";
import {EditorState} from "draft-js";
import {Post} from "../../backend";

export class CreateNewPostCommand extends AppCommand {
    parentId: string | null;

    constructor(parentId: string | null) {
        super();
        this.parentId = parentId;
    }

    name(): CommandType {
        return "CreateNewPost";
    }

    process(store: AppStore): AppStore {

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
        if (this.parentId != null) {
            parent = store.posts.get(this.parentId);
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
}