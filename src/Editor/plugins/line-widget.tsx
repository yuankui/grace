import {EmptyModel, Model, Widget} from "./core";
import {ReactNode} from "react";
import * as React from "react";
import {WidgetFactory} from "./factory";

interface Props {
}

export class LineWidget implements Widget<Props> {
    private model: Model<any> = EmptyModel;
    private children: Array<Widget<any>> = [];

    init(model: Model<any>, factory: WidgetFactory): void {
        this.model = model;
        this.children = this.model.children.map(m => factory(m.type, m));
    }

    render(): ReactNode {
        let children = this.children.map((w, i) => <span key={i}>{w.render()}</span>);
        return <div>
            {children}
        </div>
    }
}