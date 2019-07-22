import React, {Component} from 'react';
import './App.css';
import {Editor, EditorState} from 'draft-js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      console.log(editorState);
      this.setState({editorState});
    }
  }
  render() {
    return (
        <div style={{
          margin: 50,
          border: '1px solid red',
        }}>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
    );
  }
}

export default App;
