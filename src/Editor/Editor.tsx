import React, {Component} from 'react';
import {EditorState, RichUtils, Editor, convertToRaw} from 'draft-js';
import {Button} from "antd";
import {createToggleHeaderPlugin} from "./plugins/toggle-header-plugin";
import {createToggleListPlugin} from "./plugins/toggle-list-plugin";
import {EditorPlugin, mergePlugins} from "./plugins";
import {createResetBlockAfterEnter} from "./plugins/reset-block-after-enter";
import {createInlineHotkey} from "./plugins/inline-hot-key-plugin";
import {createCodePlugin} from "./plugins/code-plugin";
import {createTodoPlugin} from "./plugins/todo-plugin";
import {createImagePlugin} from "./plugins/image-plugin";
import {createCodeBlockPlugin} from "./plugins/code-block-plugin";

export interface StateChange{
    (value: EditorState): void,
}

export interface GetState {
    (): EditorState;
}

interface Props {
    editorState: EditorState,
    onChange: StateChange,
}

interface State {
}


export class MyEditor extends Component<Props, State> {
    private ref: React.RefObject<Editor>;


    constructor(props: Readonly<Props>) {
        super(props);
        this.ref = React.createRef();
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
        this.logState();
    };

    onClick = (type: string) => {
        const editorState = RichUtils.toggleBlockType(this.props.editorState, type);
        this.props.onChange(editorState);
    };

    componentDidMount(): void {
        if (this.ref.current != null) {
            this.ref.current.focus();
        }
    }

    render() {
        const plugins: Array<EditorPlugin> = [
            createToggleHeaderPlugin(this.props.onChange),
            createToggleListPlugin(this.props.editorState, this.props.onChange),
            createResetBlockAfterEnter(this.props.onChange),
            createInlineHotkey(this.props.editorState, this.props.onChange),
            createCodePlugin(this.props.editorState, this.props.onChange),
            createTodoPlugin(() => this.props.editorState, this.props.onChange),
            createImagePlugin(this.props.editorState, this.props.onChange),
            createCodeBlockPlugin(this.props.editorState, this.props.onChange),
        ];

        const props = mergePlugins(plugins);

        return (
                <div className='editor'>
                    <div>
                        <Button onClick={e=>this.toggle()}>toggle</Button>
                        <Button onClick={e=>this.logState()}>logState</Button>
                    </div>
                    <Editor
                        editorState={this.props.editorState}
                        ref={this.ref}
                        onChange={this.onChange}
                        {...props}
                    />
                </div>
        );
    }

    logState() {
        const content = this.props.editorState.getCurrentContent();
        console.log(JSON.stringify(convertToRaw(content)));
    }
    toggle() {
        const state = RichUtils.toggleBlockType(this.props.editorState, 'grace-code-block');
        if (this.ref.current != null) {
            this.ref.current.focus();
        }
        this.props.onChange(state);
    }
}