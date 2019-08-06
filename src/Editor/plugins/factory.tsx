import {LineWidget} from "./line-widget";
import * as React from "react";
import {EmptyModel, Model, Widget} from "./core";
import {TextWidget} from "./text-widget";

class InvalidWidget implements Widget<any> {
    private model: Model<any> = EmptyModel;
    render(): any {
        return <span>|unknown-widget:{this.model.type}|</span>
    }

    init(model: Model<any>, factory: WidgetFactory): void {
        this.model = model;
    }

}
interface Factory {
    (): Widget<any>;
}

interface FactoryMap {
    [pluginName: string]: Factory;
}

let factory: FactoryMap = {
    line: () => new LineWidget(),
    text: () => new TextWidget(),
};

export interface WidgetFactory {
    (name: string, model: Model<any>): Widget<any>;
}

export function createWidget(name: string, model: Model<any>): Widget<any> {
    let factory1 = factory[name];
    if(factory1 == null) {
        let invalidWidget = new InvalidWidget();
        invalidWidget.init(model, createWidget);
        return invalidWidget;
    }
    let widget = factory1();
    widget.init(model, createWidget);
    return widget;
}