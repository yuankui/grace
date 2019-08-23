import * as React from "react";
import {ReactElement} from "react";
import {ContentBlock, EditorState, Modifier,} from "draft-js";
import {StateChange} from "../../Editor";
import {Input} from "antd";
import {Controlled as CodeMirror} from 'react-codemirror2'
import * as codemirror from 'codemirror';
import * as Immutable from 'immutable';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

export interface CodeProps {
    block: ContentBlock,
    blockProps: CodeBlockProps,
}

export interface CodeBlockProps {
    state: EditorState,
    onChange: StateChange,
}

/**
 * TODO: support scale
 * TODO: support caption
 * TODO: save image as a file: to save space in .git
 *
 * there is still some bugs.
 */
export class CodeBlock extends React.Component<CodeProps, any> {
    private readonly content: ReactElement;

    constructor(props: Readonly<CodeProps>) {
        super(props);
        this.content = <Input
            onKeyPress={e => e.stopPropagation()}
            onKeyUp={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}/>;
    }

    onChange = (editor: codemirror.Editor, data: codemirror.EditorChange, value: string) => {

        const newData = Immutable.fromJS({
            code: value,
        });
        const newContent = Modifier.setBlockData(this.props.blockProps.state.getCurrentContent(),
            this.props.blockProps.state.getSelection(),
            newData
        );

        const newState = EditorState.push(this.props.blockProps.state, newContent, 'change-block-data');

        console.log('newcode', value);
        this.props.blockProps.onChange(newState);
    };

    render() {
        const {block} = this.props;
        const data = block.getData();
        let code = data.get("code", "");
        console.log('show code', code);
        return <CodeMirror value={code}
                           options={{
                               mode: 'javascript',
                               theme: 'material',
                               lineNumbers: true
                           }}
                           onBeforeChange={this.onChange}
        />
    }
}