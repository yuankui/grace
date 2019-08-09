import {LineWidget} from "./line-widget";
import * as React from "react";
import {ReactElement, ReactNode} from "react";
import {Widget, WidgetConfig} from "./core";
import {TextWidget} from "./text-widget";
import {LinkWidget} from "./link-widget";
import {MentionWidget} from "./mention-widget";
import {CommentWidget} from "./comment-widget";

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

interface InvalidWidgetProp {
    type: string,
    props: any,
}

class InvalidWidget extends Widget<InvalidWidgetProp, any> {
    render(): ReactNode {
        return <span className='invalid-node'>invalid node{this.props.props.type}</span>;
    }
}

export interface WidgetFactory {
    (config: WidgetConfig, key?: number): ReactElement;
}

export function createWidget(config: WidgetConfig, key?: number): ReactElement {
    let WidgetName = factory[config.type];
    if (WidgetName == null) {
        return <InvalidWidget factory={createWidget} props={config} key={key}/>
    }

    return <WidgetName props={config.props} factory={createWidget} key={key}/>;
}