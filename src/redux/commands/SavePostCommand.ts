import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";

export class SavePostCommand extends AppCommand {
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    name(): CommandType {
        return "SavePost";
    }

    process(state: AppStore): AppStore {
        let post = state.posts.get(this.id);
        if (post == null) {
            return state;
        }
        state.backend.savePost(post);
        return state;
    }

}