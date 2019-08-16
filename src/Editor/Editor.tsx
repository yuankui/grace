import React, {Component} from 'react';
import {EditorState, Modifier, RichUtils} from 'draft-js';
// @ts-ignore
import Editor from 'draft-js-plugins-editor/lib/index';
import {Button} from "antd";

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

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    onClick = (type: string) => {
        const editorState = RichUtils.toggleBlockType(this.props.editorState, type);
        this.props.onChange(editorState);
    };

    render() {
        const plugins: any = [];

        return (
                <div>
                    <div>
                        <Button onClick={e=>this.onClick('header-one')}>H1</Button>
                        <Button onClick={e=>this.onClick('unordered-list-item')}>-</Button>
                    </div>
                    <Editor
                        editorState={this.props.editorState}
                        onChange={this.onChange}
                        plugins={plugins}>

                    </Editor>
                </div>
        );
    }
}