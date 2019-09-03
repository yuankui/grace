import {AppCommand} from "../../command";
import {AppStore} from "../store";

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