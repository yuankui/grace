import React, {createRef, KeyboardEvent} from 'react';
import {MyEditor} from "./Editor/Editor";
import {convertFromRaw, EditorState} from "draft-js";
import './App.css';
import {Button, Icon, Input, Layout} from 'antd';
import TreeMenu, {TreeNodeInArray} from 'react-simple-tree-menu';
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
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "./redux/store";
import {BaseAction} from "./redux/actions";

const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
    editorState: EditorState,
    title: string,
}

interface AppProps {
    state: AppStore,
    dispatch: Dispatch<BaseAction>,
    list: Array<TreeNodeInArray>,
}

function mapStateToList(state: AppStore): Array<TreeNodeInArray> {
    const nodes: Array<TreeNodeInArray> = state.postList.map(p => {
        return {
            label: p.title,
            key: p.id as string,
        }
    });
    return nodes;
}

class App extends React.Component<AppProps, AppState> {
    private readonly editor: React.RefObject<MyEditor>;
    private readonly backend: Backend;
    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();

        // init state
        console.log(this.props);
        let post = this.props.state.currentPost;

        let editorState = EditorState.createEmpty();
        if (post != null) {
            const content = convertFromRaw(post.content);
            editorState = EditorState.createWithContent(content);
        }
        this.state = {
            editorState: editorState,
            editable: false,
            title: "",
        };

        // init backend
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            // Electron-specific code
            this.backend = createElectronBackend("/Users/yuankui/grace-docs");
        } else {
            this.backend = createWebBackend();
        }
    }

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
                    <div className='search-bar'>
                        <Input className='input' placeholder="search"/>
                        <span className='icon'><Button><Icon type="edit" /></Button></span>
                    </div>
                    <TreeMenu hasSearch={false} onClickItem={(e) => console.log(e)} data={this.props.list} />
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

function mapState(state: AppStore) {
    return {
        state,
        list: mapStateToList(state),
    }
}

export default connect(mapState)(App);