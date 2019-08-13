import * as React from "react";
import {ReactNode} from "react";
import {Selection, Widget, WidgetProps} from "./core";

interface Props {
    value: string,
}

export class TextWidget extends Widget<Props, any> {
    /**
     * 通过ref搞定操作底层dom元素
     * https://zh-hans.reactjs.org/docs/refs-and-the-dom.html
     */
    private ref: React.RefObject<HTMLSpanElement>;


    constructor(props: WidgetProps<Props>, context: any) {
        super(props, context);
        this.ref = React.createRef();

    }

    onInput(e: React.FormEvent<HTMLSpanElement>) {
        let span: any = e.target;
        if (this.props.onChange != null) {

            let sel: Selection | null = null;
            let selection = window.getSelection();
            if (selection != null) {
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
        let selection = window.getSelection();
        let range: Range = document.createRange();
        if (this.ref.current != null && selection != null) {
            let text = this.ref.current.childNodes[0];
            range.setStart(text, 3);
            range.setEnd(text, 3);
            selection.removeAllRanges();
            selection.addRange(range);
            console.log(text);
        }
    }

    componentDidMount(): void {
        console.log(this.ref.current);
    }

    render(): ReactNode {
        const child = <span ref={this.ref} onInput={(e) => this.onInput(e)}
                            suppressContentEditableWarning={true}
                            contentEditable={true}>{this.props.value.params.value}</span>;
        return child;
    }
}