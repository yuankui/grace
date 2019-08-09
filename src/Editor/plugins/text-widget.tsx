import * as React from "react";
import {ReactNode} from "react";
import {Widget} from "./core";

interface Props {
    value: string,
}

export class TextWidget extends Widget<Props, any> {

    onInput(e: React.FormEvent<HTMLSpanElement>) {
        let span: any = e.target;
        if (this.props.onChange != null) {
            this.props.onChange({
                type: "text",
                params: {
                    value: span.innerText,
                }
            });
        }
    }

    render(): ReactNode {
        return <span onInput={(e) => this.onInput(e)}
                     suppressContentEditableWarning={true}
                     contentEditable={true}>{this.props.value.params.value}</span>
    }
}