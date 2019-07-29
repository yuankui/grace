import * as React from 'react';
import BasePlugin from "../BasePlugin";

interface H1Props {
    editable: boolean,
}

interface H1State {
}

interface KeyListener {
    (key: string): void;
}

interface ListenerMap {
    [prop: string]: KeyListener;
}

export default class H1 extends BasePlugin<H1Props, H1State> {

    keyPress(e: React.KeyboardEvent<HTMLHeadingElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    render() {
        return <h1 contentEditable={this.props.editable} onKeyPress={(e) => this.keyPress(e)}>
        </h1>
    }
};