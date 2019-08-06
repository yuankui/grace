import {EmptyModel, Model, Widget} from "./core";
import {WidgetFactory} from "./factory";
import {ReactNode} from "react";
import * as React from "react";

interface Props {
    href: string,
}

export class LinkWidget implements Widget<Props>{
    private model: Model<Props> = EmptyModel;
    private children: Widget<any>[] = [];
    init(model: Model<Props>, factory: WidgetFactory): void {
        this.model = model;
        this.children = model.children.map(m => factory(m.type, m));
    }

    render(): ReactNode {
        let children = this.children.map(w => w.render());
        return <a href={this.model.prop.href}>{children}</a>
    }
}