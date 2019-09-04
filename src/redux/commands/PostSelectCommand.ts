import {AppCommand, CommandType} from "./index";
import {AppStore, EditingPost} from "../store";
import {convertFromRaw, EditorState} from "draft-js";

export class PostSelectCommand extends AppCommand {
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    name(): CommandType {
        return "PostSelect";
    }

    process(state: AppStore): AppStore {
        // 2. switch post
        let post = state.posts.get(this.id);
        let currentPost: EditingPost = {
            saved: true,
            id: this.id,
            tags: post.tags,
            title: post.title,
            editorState: EditorState.createWithContent(
                convertFromRaw(post.content)
            )
        };

        return {
            ...state,
            currentPost
        }
    }

}