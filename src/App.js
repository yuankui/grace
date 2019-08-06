import React from 'react';
import {MyEditor} from "./Editor/Editor";
import config from './Editor/model.yaml';

export default () => {
    return <MyEditor model={config}/>;
}