import React from 'react';
import {MyEditor} from "./Editor/Editor";
import {EditorState} from "draft-js";

export class App extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange = (v) => {
        this.setState({
            editorState: v,
        });
    };

    render() {
        return <div>
            <MyEditor editorState={this.state.editorState} onChange={this.onChange}/>
        </div>;
    }
}