import * as React from 'react';
import {Component, ReactNode} from 'react';
import {WidgetValue} from "./plugins/core";
import {getWidget} from "./plugins/factory";

interface Props {
    value: WidgetValue<any>,
}

interface State {
    value: WidgetValue<any>,
}
export class MyEditor extends Component<Props, State> {


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            value: {
                type: 'text',
                params: {
                    value: 'hello this is header'
                }
            },
        }
    }

    render(): ReactNode {
        const Child = getWidget("text");

        return <Child factory={getWidget}
                      value={this.state.value}
                      onChange={(v) => this.onChange(v)}
        />
    }

    private onChange(v: any) {
        this.setState({
            value: v,
        })
    }
}