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

interface State {
    editorState: EditorState,
    saved: boolean,
}

export class MyEditor extends Component<Props, State> {
    private readonly ref: React.RefObject<Editor>;

    constructor(props: Readonly<Props>) {
        super(props);
        this.ref = React.createRef();
        this.state ={
            editorState: this.props.editorState,
            saved: true,
        };
    }

    save = () => {
        if (!this.state.saved) {
            this.props.onChange(this.state.editorState);
            this.setState({
                saved: true,
            })
        }
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
        const wordCount = this.props.editorState.getCurrentContent()
            .getBlockMap()
            .valueSeq()
            .map<number>(value => {
                if (value != null) {
                    return value.getLength();
                }
                return 0;
            })
            .reduce((reduction, value) => (reduction as number) + (value as number), 0);

        return (
            <div onBlur={this.save} className='editor' onClick={() => this.focus()}>
                <Editor
                    placeholder={"Start here..."}
                    editorState={this.state.editorState}
                    readOnly={!this.props.editable}
                    ref={this.ref}
                    onChange={editorState => {
                        this.setState({
                            editorState,
                            saved: false,
                        });
                    }}
                    {...this.props.plugin}
                />
                <div className={"post-bottom-bar"}>
                    word count: {wordCount}
                </div>
            </div>
        );
    }
}