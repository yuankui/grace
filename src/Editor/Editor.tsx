// @ts-ignore
import Editor from 'draft-js-plugins-editor';
import React from 'react';
import {createAcckeyPlugin} from './plugins/acckey-plugin';


export default function MyEditor(props: any) {
    let plugins = [createAcckeyPlugin(props.onChange)];
    return (
        <Editor
            editorState={props.editorState}
            onChange={props.onChange}
            plugins={plugins}
        />
    );
};