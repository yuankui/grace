import React from 'react';
import {MyEditor} from "./Editor/Editor";
import config from './Editor/models/test.yaml';

export default () => {
    return <MyEditor value={config}/>;
}