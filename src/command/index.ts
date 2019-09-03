import {Action, Middleware, Reducer} from "redux";

const CommandActionName = "CommandAction";

export const commandMiddleware: Middleware = api => next => action => {
    if (action instanceof Command) {

        let nextState: any = action.process(api.getState());
        next({
            type: CommandActionName + ":" + action.name(),
            state:nextState,
            command: action,
        });
        return nextState;
    }
    return next(action);
};

export abstract class Command<S, C = string> {
    abstract name(): C;
    process(state: S): S {
        return state;
    }
}

export interface CommandAction<S> extends Action<string> {
    type: string,
    state: S,
    command: Command<S>,
}

export function enhanceCommandReducer<S, A extends Action<string>>(reducer: Reducer<S, A>) {
    return function (state: S |undefined, action: A): S {
        if (action.type.startsWith(CommandActionName)) {
            let a: any = action;
            return a.state;
        }else {
            return reducer(state, action);
        }
    }
}