import {LineWidget} from "./line-widget";
import * as React from "react";
import {ComponentClass, ReactNode} from "react";
import {Widget, WidgetProps} from "./core";
import {TextWidget} from "./text-widget";

interface FactoryMap {
    [pluginName: string]: ComponentClass<WidgetProps<any>>;
}

let factory: FactoryMap = {
    line: LineWidget,
    text: TextWidget,
};

interface InvalidWidgetProp {
    type: string,
    props: any,
}

class InvalidWidget extends Widget<InvalidWidgetProp, any> {
    render(): ReactNode {
        return <span className='invalid-node'>invalid node{this.props.value.type}</span>;
    }
}

export interface WidgetFactory {
    (type: string): ComponentClass<WidgetProps<any>>;
}

export function getWidget(type: string): ComponentClass<WidgetProps<any>> {
    let WidgetName = factory[type];
    if (WidgetName == null) {
        return InvalidWidget;
    }

    return WidgetName;
}