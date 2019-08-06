import {EmptyModel, Model, Widget} from "./core";
import {WidgetFactory} from "./factory";
import {ReactNode} from "react";
import * as React from "react";

interface Props {
    id: string,
    name: string,
}

export class MentionWidget implements Widget<Props>{
    private model: Model<Props> = EmptyModel;
    init(model: Model<Props>, factory: WidgetFactory): void {
        this.model = model;
    }

    render(): ReactNode {
        return <span style={{
            padding: 2,
            background: 'purple',
            borderRadius: 5,
        }}>{this.model.prop.name}({this.model.prop.id})</span>
    }
}