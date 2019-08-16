import React, {Component} from 'react';
import {EditorState, RichUtils, Editor} from 'draft-js';
import {Button} from "antd";
import {createToggleHeaderPlugin} from "./plugins/toggle-header-plugin";
import {createToggleListPlugin} from "./plugins/toggle-list-plugin";
import {mergePlugins} from "./plugins";

export interface StateChange{
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
        const plugins: any = [
            createToggleHeaderPlugin(this.props.onChange),
            createToggleListPlugin(this.props.editorState, this.props.onChange),
        ];

        const props = mergePlugins(plugins);

        return (
                <div className='editor'>
                    <div>
                        <Button onClick={e=>this.onClick('header-one')}>H1</Button>
                        <Button onClick={e=>this.onClick('unordered-list-item')}>-</Button>
                    </div>
                    <Editor
                        editorState={this.props.editorState}
                        onChange={this.onChange}
                        {...props}
                    />
                </div>
        );
    }
}