import {EmptyModel, WidgetProp, Widget} from "./core";
import {WidgetFactory} from "./factory";
import {ReactNode} from "react";
import * as React from "react";

interface Props {
    id: string,
    name: string,
}

export class CommentWidget implements Widget<Props>{
    private model: WidgetProp<Props> = EmptyModel;
    private children: Widget<any>[] = [];
    init(model: WidgetProp<Props>, factory: WidgetFactory): void {
        this.model = model;
        this.children = model.children.map(m => factory(m.type, m));
    }

    render(): ReactNode {
        let children = this.children.map(w => w.render());
        return <span style={{
            fontStyle: 'italic',
            cursor: 'crosshair'
        }}>{children}</span>
    }
}