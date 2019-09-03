import {AppStore} from "../store";
import {AppCommand} from "./index";

export class TestCommand extends AppCommand {
    process(state: AppStore): AppStore {
        return {
            ...state,
            isOpening: true,
        }
    }

    name(): string {
        return "TestCommand";
    }
}