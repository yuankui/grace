import {AppStore} from "../store";
import {Command} from "../../command";

export abstract class AppCommand extends Command<AppStore, CommandType> {
}

export type CommandType = "TestCommand"
    | "KittyCommand"
    | "UpdateEditingPost"
    | "SavePost"
    | "CreateNewPost"
    | "PostSelect"
;