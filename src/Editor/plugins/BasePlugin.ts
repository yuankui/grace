import * as React from 'react';

export interface PluginProps<T> {
    value: PluginParam<T>,
    parent: BasePlugin<any, any>,
}

export interface PluginParam<T> {
    type: string,
    param: T,
}

export abstract class BasePlugin<T, S> extends React.Component<PluginProps<T>, S> {
    onNewLine(child: BasePlugin<any, any>): void {
    };

    abstract pluginName(): string;

    init(obj: T) {
    }
}
