import * as React from 'react';
import BasePlugin from "../BasePlugin";

interface H1Props {
    editable: boolean,
}

export default class H1 extends BasePlugin<H1Props, object> {
    render() {
        return <h1 contentEditable={this.props.editable}>
        </h1>
    }
};