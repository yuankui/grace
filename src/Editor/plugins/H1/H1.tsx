import * as React from 'react';
import './style.css';
import {BasePlugin} from "../BasePlugin";

interface H1Param {
    value: string,
}

export default class H1 extends BasePlugin<H1Param, any> {
    pluginName(): string {
        return "h1";

    }

    keyPress = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (this.props.parent != null) {
                this.props.parent.onNewLine(this);
            }
        }
    };

    onChange = (e: React.FormEvent<HTMLHeadingElement>) => {
        // TODO fix this
        console.log(JSON.stringify(e));
    };

    render() {
        return <h1 onInput={(e) => this.onChange(e)} contentEditable={true} placeholder="Heading 1" onKeyPress={e => this.keyPress(e)}>
        </h1>
    }
};