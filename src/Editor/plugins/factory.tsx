import {LineWidget} from "./line-widget";
import * as React from "react";
import {Widget, WidgetProp} from "./core";
import {TextWidget} from "./text-widget";
import {LinkWidget} from "./link-widget";
import {MentionWidget} from "./mention-widget";
import {CommentWidget} from "./comment-widget";
import {ReactElement, ReactNode} from "react";

interface FactoryMap {
    [pluginName: string]: any;
}

let factory: FactoryMap = {
    line: LineWidget,
    text: TextWidget,
    link: LinkWidget,
    mention: MentionWidget,
    comment: CommentWidget,
};

class InvalidWidget extends Widget<WidgetProp, any> {
    render(): ReactNode {
        return <span>invalid node{this.props.type}</span>;
    }
}

export interface WidgetFactory {
    (name: string, props: WidgetProp): Widget<any, any>;
}

export function createWidget(name: string, props: WidgetProp): ReactElement {
    let WidgetName = factory[name];
    if (WidgetName == null)
        WidgetName = InvalidWidget;
    return <WidgetName {...props}/>;
}