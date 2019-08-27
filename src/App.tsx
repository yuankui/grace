import React from 'react';
import {MyEditor} from "./Editor/Editor";
import {EditorState} from "draft-js";
import './App.css';
import {Input, Layout} from 'antd';
import TreeMenu from 'react-simple-tree-menu';
import './menu.css';


const {Sider, Content} = Layout;

const treeData = [
    {
        key: 'first-level-node-1',
        label: 'Node 1 at the first level',
        nodes: [
            {
                key: 'second-level-node-1',
                label: 'Node 1 at the second level',
                nodes: [
                    {
                        key: 'third-level-node-1',
                        label: 'Last node of the branch',
                        nodes: [] // you can remove the nodes property or leave it as an empty array
                    },
                ],
            },
        ],
    },
    {
        key: 'first-level-node-2',
        label: 'Node 2 at the first level',
    },
    {
        key: 'first-level-node-3',
        label: 'Node 3 at the first level',
    },
];


export class App extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange = (v: EditorState) => {
        this.setState({
            editorState: v,
        });
    };

    render() {
        return (
            <Layout className='layout'>
                <Sider theme='light' width={300}>
                    <TreeMenu onClickItem={(e) => console.log(e)} data={treeData} />
                </Sider>
                <Content>
                    <Input className='title' onKeyPress={event => {
                        if (event.key === 'Enter') {
                            const editor: any = this.refs.editor;
                            if (editor.focus != null) {
                                editor.focus();
                            }
                        }
                    }}/>
                    <MyEditor ref='editor' editorState={this.state.editorState} onChange={this.onChange}/>
                </Content>
            </Layout>
        );
    }
}