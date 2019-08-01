import React, {useState} from 'react';
import Editor from "./Editor/Editor";
import {EditorState} from 'draft-js';

let initial = EditorState.createEmpty();

export default () => {
    let [state, setState] = useState(initial);
    return <Editor editorState={state} onChange={setState}/>;
}