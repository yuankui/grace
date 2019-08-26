import React, {Component} from 'react';
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import {Button, Switch} from "antd";
import {createToggleHeaderPlugin} from "./plugins/toggle-header-plugin";
import {EditorPlugin, mergePlugins} from "./plugins";
import {createCodePlugin} from "./plugins/code-plugin";
import {createTodoPlugin} from "./plugins/todo-plugin";
import {createImagePlugin} from "./plugins/image-plugin";
import {createResetBlockAfterEnter} from "./plugins/common-plugin/reset-block-after-enter";
import {createInlineHotkey} from "./plugins/common-plugin/inline-hot-key-plugin";
import {createSoftInsertPlugin} from "./plugins/common-plugin/soft-insert-plugin";
import {createToggleListPlugin} from "./plugins/toggle-prefix-plugin";

export interface StateChange {
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
    editable: boolean,
}

export interface EditController {
    setEditable(editable: boolean): void;
}

export class MyEditor extends Component<Props, State> {
    private ref: React.RefObject<Editor>;


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            editable: true,
        };
        this.ref = React.createRef();
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
        this.logState();
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
            createSoftInsertPlugin(this.props.editorState, this.props.onChange),
        ];

        const props = mergePlugins(plugins);

        return (
            <div className='editor'>
                <div>
                    <Button onClick={e => this.toggle()}>toggle</Button>
                    <Button onClick={e => this.logState()}>logState</Button>
                    <Switch checked={this.state.editable} onChange={
                        e => this.setState({
                            editable: e,
                        })
                    }/>
                </div>
                <Editor
                    editorState={this.props.editorState}
                    readOnly={!this.state.editable}
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
        const state = RichUtils.toggleBlockType(this.props.editorState, 'code-block');
        if (this.ref.current != null) {
            this.ref.current.focus();
        }
        this.props.onChange(state);
    }
}