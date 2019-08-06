import {LineWidget} from "./line-widget";
import * as React from "react";
import {Model, Widget} from "./core";
import {TextWidget} from "./text-widget";

class InvalidWidget implements Widget {
    private model: Model | undefined;
    render(): any {
        let type = this.model === undefined? "undefined": this.model.type;
        return <span>|unknown-widget:{type}|</span>
    }

    init(model: Model): void {
        this.model = model;
    }

}
interface Factory {
    (): Widget;
}
interface FactoryMap {
    [pluginName: string]: Factory;
}

let factory: FactoryMap = {
    line: () => new LineWidget(),
    text: () => new TextWidget(),
};

export function createWidget(name: string, model: Model): Widget {
    let factory1 = factory[name];
    if(factory1 == null) {
        let invalidWidget = new InvalidWidget();
        invalidWidget.init(model);
        return invalidWidget;
    }
    let widget = factory1();
    widget.init(model);
    return widget;
}