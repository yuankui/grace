import * as React from 'react';
import {BasePlugin, PluginProps} from "../BasePlugin";

interface DivProps {
}

interface DivState {
}

export default class Div extends BasePlugin<DivProps, DivState> {
    pluginName(): string {
        return "div";
    }

    render() {
        return <div>
            {this.props.children}
        </div>
    }
};