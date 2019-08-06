import React from 'react';
import {MyEditor} from "./Editor/Editor";

export default () => {
    let model = {
        type: "text",
        prop: {
            value: "hello this is header"
        }
    };
    return <MyEditor model={model}/>;
}