import React, {createRef, KeyboardEvent, KeyboardEventHandler} from 'react';
import {MyEditor} from "./Editor/Editor";
import {EditorState} from "draft-js";
import './App.css';
import {Input, Layout} from 'antd';
import TreeMenu from 'react-simple-tree-menu';
import './menu.css';
import {Backend} from "./backend";
import {createElectronBackend} from "./backend/electron/ElectronBackend";
import {createWebBackend} from "./backend/web/WebBackend";
import {EditorPlugin, mergePlugins} from "./Editor/plugins";
import {createToggleHeaderPlugin} from "./Editor/plugins/toggle-header-plugin";
import {createToggleListPlugin} from "./Editor/plugins/toggle-prefix-plugin";
import {createResetBlockAfterEnter} from "./Editor/plugins/common-plugin/reset-block-after-enter";
import {createInlineHotkey} from "./Editor/plugins/common-plugin/inline-hot-key-plugin";
import {createCodePlugin} from "./Editor/plugins/code-plugin";
import {createTodoPlugin} from "./Editor/plugins/todo-plugin";
import {createImagePlugin} from "./Editor/plugins/image-plugin";
import {createSoftInsertPlugin} from "./Editor/plugins/common-plugin/soft-insert-plugin";


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
    private backend: Backend;
    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();

        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            // Electron-specific code
            this.backend = createElectronBackend("/Users/yuankui/grace-docs");
        } else {
            this.backend = createWebBackend();
        }
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
        const plugins: Array<EditorPlugin> = [
            createToggleHeaderPlugin(this.onChange),
            createToggleListPlugin(this.state.editorState, this.onChange),
            createResetBlockAfterEnter(this.onChange),
            createInlineHotkey(this.state.editorState, this.onChange),
            createCodePlugin(this.state.editorState, this.onChange),
            createTodoPlugin(() => this.state.editorState, this.onChange),
            createImagePlugin(this.state.editorState, this.onChange),
            createSoftInsertPlugin(this.state.editorState, this.onChange),
        ];

        const plugin = mergePlugins(plugins);

        return (
            <Layout className='layout'>
                <Sider theme='light' width={300}>
                    <TreeMenu onClickItem={(e) => console.log(e)} data={treeData} />
                </Sider>
                <Content onKeyDown={this.onSave}>
                    <Input className='title' onKeyPress={this.focus}/>
                    <MyEditor ref={this.editor}
                              backend={this.backend}
                              onEditableChange={this.setEditable}
                              editable={this.state.editable}
                              editorState={this.state.editorState}
                              plugin={plugin}
                              onChange={this.onChange}/>
                </Content>
            </Layout>
        );
    }
}