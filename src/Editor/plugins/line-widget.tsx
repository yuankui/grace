import {Widget, WidgetValue} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props {
    children: Array<WidgetValue<any>>,
}

export class LineWidget extends Widget<Props, any> {
    render(): ReactNode {
        const children = this.props.value.params.children.map((c, i) => {
            const Child = this.props.factory(c.type);
            return <Child factory={this.props.factory}
                          value={c}
                          onChange={(v) => this.onChildChange(v, i)}/>
        });

        return <div>
            {children}
        </div>
    }

    private onChildChange(v: any, i: number) {

    }
}