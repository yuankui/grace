import React, {Component} from 'react';
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import {Button, Switch} from "antd";
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
    onEditableChange: (editable: boolean) => void;
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
        this.logState();
    };

    componentDidMount(): void {
        this.focus();
    }

    focus() {
        if (this.ref.current != null) {
            this.ref.current.focus();
        }
    }

    setEditable = (editable: boolean) => {
        this.props.onEditableChange(editable);
    };

    render() {

        return (
            <div className='editor' onClick={() => this.focus()}>
                <div>
                    <Button onClick={e => this.toggle()}>toggle</Button>
                    <Button onClick={e => this.logState()}>logState</Button>
                    <Switch checked={this.props.editable} onChange={this.setEditable}/>
                </div>
                <Editor
                    editorState={this.props.editorState}
                    readOnly={!this.props.editable}
                    ref={this.ref}
                    onChange={this.onChange}
                    {...this.props.plugin}
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