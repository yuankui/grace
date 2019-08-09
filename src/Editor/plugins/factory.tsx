import {LineWidget} from "./line-widget";
import * as React from "react";
import {Widget, WidgetConfig, WidgetProp} from "./core";
import {TextWidget} from "./text-widget";
import {LinkWidget} from "./link-widget";
import {MentionWidget} from "./mention-widget";
import {CommentWidget} from "./comment-widget";
import {ReactElement, ReactNode} from "react";
import './factory.less';
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

interface InvalidWidgetProp extends WidgetProp {
    type: string,
    props: any,
}

class InvalidWidget extends Widget<InvalidWidgetProp, any> {
    render(): ReactNode {
        return <span className='invalid-node'>invalid node{this.props.type}</span>;
    }
}

export interface WidgetFactory {
    (config: WidgetConfig): ReactElement;
}

export function createWidget(config: WidgetConfig): ReactElement {
    let WidgetName = factory[config.type];
    if (WidgetName == null) {
        return <InvalidWidget type={config.type} factory={createWidget} props={config.props} />
    }

    return <WidgetName {...config.props} factory={createWidget}/>;
}