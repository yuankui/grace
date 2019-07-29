import React, {Component} from 'react';
import './editor.css';
import H1 from "./plugins/H1/H1";

export default class Editor extends Component {
    render() {
        return (
            <div>
                <H1 editable={true}/>
            </div>
        );
    }
}