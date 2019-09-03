import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Post} from "../../backend";
import {convertToRaw} from "draft-js";

export class SavePostCommand extends AppCommand{
    name(): CommandType {
        return "SavePost";
    }

    process(state: AppStore): AppStore {
        let currentPost = state.currentPost;
        let post = state.posts.get(currentPost.id);

        const newPost: Post = {
            ...post,
            id: currentPost.id,
            title: currentPost.title,
            tags: currentPost.tags,
            content: convertToRaw(currentPost.editorState.getCurrentContent()),
        };

        const posts = state.posts.set(newPost.id, newPost);

        return {
            ...state,
            posts,
        }
    }
}