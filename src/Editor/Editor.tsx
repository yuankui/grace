import React, {Component} from 'react';
import {Editor, EditorState} from 'draft-js';
import {EditorPlugin} from "./plugins";
import './editor.css';
import {Backend} from "../backend";

export interface StateChange {
    (value: EditorState): void,
}

export interface GetState {
    (): EditorState;
}

interface Props {
    editorState: EditorState,
    onChange: StateChange,
    editable: boolean,
    backend: Backend;
    plugin: EditorPlugin,
}

export interface EditController {
    setEditable(editable: boolean): void;
}

export class MyEditor extends Component<Props, any> {
    private readonly ref: React.RefObject<Editor>;

    constructor(props: Readonly<Props>) {
        super(props);
        this.ref = React.createRef();
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    componentDidMount(): void {
        this.focus();
    }

    focus() {
        if (this.ref.current != null) {
            this.ref.current.focus();
        }
    }

    render() {
        return (
            <div className='editor' onClick={() => this.focus()}>
                <Editor
                    placeholder={"Start here..."}
                    editorState={this.props.editorState}
                    readOnly={!this.props.editable}
                    ref={this.ref}
                    onChange={this.onChange}
                    {...this.props.plugin}
                />
                <div className={"post-bottom-bar"}>
                    hello
                </div>
            </div>
        );
    }
}