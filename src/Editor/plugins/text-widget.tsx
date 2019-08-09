import * as React from "react";
import {ReactNode} from "react";
import {Selection, Widget, WidgetProps} from "./core";

interface Props {
    value: string,
}

export class TextWidget extends Widget<Props, any> {

    onInput(e: React.FormEvent<HTMLSpanElement>) {
        let span: any = e.target;
        if (this.props.onChange != null) {

            let sel: Selection|null = null;
            let selection = window.getSelection();
            if(selection != null) {
                sel = {
                    widget: this,
                    range: selection.getRangeAt(0),
                };
            }

            this.props.onChange({
                type: "text",
                params: {
                    value: span.innerText,
                },
                selection: sel,
            });

        }
    }

    componentDidUpdate(prevProps: Readonly<WidgetProps<Props>>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props.value.selection == null)
            return;
        if (this.props.value.selection.widget !== this)
            return;

        let selection = window.getSelection();
        if (selection != null && this.props.value.selection.range != null) {
            selection.addRange(this.props.value.selection.range);
        }
    }

    render(): ReactNode {
        const child = <span onInput={(e) => this.onInput(e)}
                     suppressContentEditableWarning={true}
                     contentEditable={true}>{this.props.value.params.value}</span>
        console.log(child);
        return child;
    }
}