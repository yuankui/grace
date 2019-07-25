import React, {Component} from 'react';
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import editorStyles from './editorStyles.css';

const sideToolbarPlugin =  createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [sideToolbarPlugin];
const text = 'The toolbar above the editor can be used for formatting text, as in conventional static editors  …';



export default class App extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
                <SideToolbar />
            </div>
        );
    }
}