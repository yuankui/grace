import * as React from 'react';
import {Component} from 'react';
import {WidgetConfig} from "./plugins/core";
import {createWidget} from "./plugins/factory";

interface Props {
    model: WidgetConfig,
}

export class MyEditor extends Component<Props, any> {
    private readonly widget: React.ReactElement;

    constructor(props: Readonly<Props>) {
        super(props);
        this.widget = createWidget(props.model);
    }

    render() {
        return this.widget;
    }
}