import React, {Component, useState} from 'react';
import Editor from "./Editor/Editor";
import {EditorState} from 'draft-js';

export default () => {

    let [state, setState] = useState(EditorState.createEmpty());

    return <Editor editorState={state} onChange={setState}/>;
}