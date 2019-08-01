// @ts-ignore
import Editor from 'draft-js-plugins-editor';
import React, {Component} from 'react';
import {createAcckeyPlugin} from './plugins/hotkey';
import {EditorState} from "draft-js";


export class MyEditor extends Component<any> {
    state = {
        state: EditorState.createEmpty(),
        plugins: [createAcckeyPlugin(this.props.onChange)],
    };

    onChange = (e: EditorState) => {
        this.setState({
            state: e,
        });
    };
    render() {
        let plugins = [createAcckeyPlugin(this.onChange)];
        return (
            <Editor
                editorState={this.state.state}
                onChange={this.onChange}
                plugins={plugins}
            />
        );
    }
};