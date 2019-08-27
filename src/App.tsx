import React, {createRef, KeyboardEvent, KeyboardEventHandler} from 'react';
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

export const EditableContext = React.createContext(true);

interface AppState {
    editable: boolean,
    editorState: EditorState,
    title: string,
}
export class App extends React.Component<any, AppState> {
    private editor: React.RefObject<MyEditor>;

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();
    }

    state = {
        editorState: EditorState.createEmpty(),
        editable: false,
        title: "",
    };

    onChange = (v: EditorState) => {
        this.setState({
            editorState: v,
        });
    };

    onSave = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.metaKey && e.key === 's') {
            if (this.editor.current != null) {
                this.setEditable(!this.state.editable)
            }
            e.preventDefault();
            e.stopPropagation();
        }
    };

    setEditable = (e: boolean) => {
        this.setState({
            editable: e,
        })
    };

    focus = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const editor = this.editor.current;
            if (editor != null) {
                editor.focus();
            }
        }
    };

    changeTitle = (title: string) => {
        this.setState({
            title
        });
    };

    render() {
        return (
            <Layout className='layout'>
                <Sider theme='light' width={300}>
                    <TreeMenu onClickItem={(e) => console.log(e)} data={treeData} />
                </Sider>
                <Content onKeyDown={this.onSave}>
                    <Input className='title' onKeyPress={this.focus}/>
                    <MyEditor ref={this.editor}
                              onEditableChange={this.setEditable}
                              editable={this.state.editable}
                              editorState={this.state.editorState}
                              onChange={this.onChange}/>
                </Content>
            </Layout>
        );
    }
}