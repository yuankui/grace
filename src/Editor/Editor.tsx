import React, {Component} from 'react';
import {EditorState} from 'draft-js';
// @ts-ignore
import Editor from 'draft-js-plugins-editor/lib/index';

interface StateChange{
    (value: EditorState): void,
}
interface Props {
    editorState: EditorState,
    onChange: StateChange,
}

interface State {
}


export class MyEditor extends Component<Props, State> {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    render() {
        const plugins: any = [];

        return (
                <Editor
                    editorState={this.props.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
        );
    }
}