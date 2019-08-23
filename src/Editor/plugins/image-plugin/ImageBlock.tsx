import * as React from "react";
import {ContentBlock, EditorState,} from "draft-js";
import {StateChange} from "../../Editor";
import {Input, Popover} from "antd";
import {ReactElement} from "react";

export interface ImageProps {
    block: ContentBlock,
    blockProps: ImageBlockProps,
}

export interface ImageBlockProps {
    state: EditorState,
    onChange: StateChange,
}

/**
 * TODO: support scale
 * TODO: support caption
 * TODO: save image as a file: to save space in .git
 */
export class ImageBlock extends React.Component<ImageProps, any> {
    private readonly content: ReactElement;

    constructor(props: Readonly<ImageProps>) {
        super(props);
        this.content = <Input
            onKeyPress={e => e.stopPropagation()}
            onKeyUp={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}/>;
    }

    render() {
        const {block} = this.props;
        const data = block.getData();
        let url = data.get("url");
        return (<img width='50%' alt="load image failed" src={url}/>);
    }
}