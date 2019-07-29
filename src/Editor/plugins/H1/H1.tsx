import * as React from 'react';
import './style.css';
import BasePlugin from "../BasePlugin";

interface H1Props {
    value: string,
}

interface H1State {
}


export default class H1 extends BasePlugin<H1Props, H1State> {
    keyPress = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    render() {
        return <h1 contentEditable={true} spellCheck={true} placeholder="Heading 1" data-root="true"
                    className="title">需求</h1>
    }
};