import React, {Component} from 'react';
import {EditorState, RichUtils, Editor} from 'draft-js';
import {Button} from "antd";
import {createToggleHeaderPlugin} from "./plugins/toggle-header-plugin";
import {createToggleListPlugin} from "./plugins/toggle-list-plugin";
import {EditorPlugin, mergePlugins} from "./plugins";
import {createResetBlockAfterEnter} from "./plugins/reset-block-after-enter";
import {createInlineHotkey} from "./plugins/inline-hot-key-plugin";

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
    private ref: React.RefObject<Editor>;


    constructor(props: Readonly<Props>) {
        super(props);
        this.ref = React.createRef();
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
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
                        ref={this.ref}
                        onChange={this.onChange}
                        {...props}
                    />
                </div>
        );
    }
}