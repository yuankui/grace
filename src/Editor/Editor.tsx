// @ts-ignore
import {Component} from 'react';
import {WidgetProp, Widget} from "./plugins/core";
import {createWidget} from "./plugins/factory";

interface Props {
    model: WidgetProp<any>,
}

export class MyEditor extends Component<Props, any> {
    private widget: Widget<any>;

    constructor(props: Readonly<Props>) {
        super(props);
        this.widget = createWidget(props.model.type, props.model);
    }

    render() {
        return this.widget.render();
    }
}