import {GetState, StateChange} from "../../Editor";
import {ContentBlock} from "draft-js";
import {EditorPlugin} from "../index";
import {TodoBlock} from "./TodoBlock";
import './index.css';

export function createTodoPlugin(getState: GetState, onChange: StateChange): EditorPlugin {
    return {
        blockRendererFn(block: ContentBlock): any {
            const type = block.getType();
            if (type === 'todo') {
                return {
                    component: TodoBlock,
                    props: {
                        onChange,
                        getState,
                    },
                };
            }
        },
        blockStyleFn(block: ContentBlock): any {
            if (block.getType() === 'todo') {
                return 'block block-todo'
            }
            return null;
        }
    }
}