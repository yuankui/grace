import * as React from 'react';
import BasePlugin from "../BasePlugin";

interface DivProps {
    editable: boolean,
    parent: BasePlugin<any, any>,
}

interface DivState {
}

export default class Div extends BasePlugin<DivProps, DivState> {


    render() {
        return <div>
            {this.props.children}
        </div>
    }
};