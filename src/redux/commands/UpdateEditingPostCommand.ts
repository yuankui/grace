import {AppCommand, CommandType} from "./index";
import {AppStore, EditingPost} from "../store";

export class UpdateEditingPostCommand extends AppCommand {
    post: EditingPost;

    constructor(post: EditingPost) {
        super();
        this.post = post;
    }

    name(): CommandType {
        return "UpdateEditingPost";
    }

    process(state: AppStore): AppStore {
        return {
            ...state,
            currentPost: this.post,
        }
    }
}