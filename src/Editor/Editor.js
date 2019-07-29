import React, {Component} from 'react';
import './editor.css';
import H1 from "./plugins/H1/H1";
import Div from "./plugins/Div/Div";

export default class Editor extends Component {
    render() {
        return (
            <div>
                <Div>
                    <H1 value={"hello"} />
                </Div>
            </div>
        );
    }
}