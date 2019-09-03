import React, {ChangeEvent, createRef, KeyboardEvent} from 'react';
import {MyEditor} from "../Editor/Editor";
import {EditorState} from "draft-js";
import './App.css';
import {Button, Input, Layout} from 'antd';
import {Node} from './SiderMenu';
import './menu.css';
import {Backend} from "../backend";
import {createElectronBackend} from "../backend/electron/ElectronBackend";
import {createWebBackend} from "../backend/web/WebBackend";
import {EditorPlugin, mergePlugins} from "../Editor/plugins";
import {createToggleHeaderPlugin} from "../Editor/plugins/toggle-header-plugin";
import {createToggleListPlugin} from "../Editor/plugins/toggle-prefix-plugin";
import {createResetBlockAfterEnter} from "../Editor/plugins/common-plugin/reset-block-after-enter";
import {createInlineHotkey} from "../Editor/plugins/common-plugin/inline-hot-key-plugin";
import {createCodePlugin} from "../Editor/plugins/code-plugin";
import {createTodoPlugin} from "../Editor/plugins/todo-plugin";
import {createImagePlugin} from "../Editor/plugins/image-plugin";
import {createSoftInsertPlugin} from "../Editor/plugins/common-plugin/soft-insert-plugin";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, EditingPost} from "../redux/store";
import SiderMenu from "./SiderMenu";
import {UpdateEditingPostCommand} from "../redux/commands/UpdateEditingPostCommand";

const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
}

interface AppProps {
    state: AppStore,
    editingPost: EditingPost,
    dispatch: Dispatch<any>,
    list: Array<Node>,
}

class App extends React.Component<AppProps, AppState> {
    private readonly editor: React.RefObject<MyEditor>;
    private readonly backend: Backend;

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();

        // init state
        console.log(this.props);

        this.state = {
            editable: false,
        };

        // init backend
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            // Electron-specific code
            this.backend = createElectronBackend("/Users/yuankui/grace-docs");
        } else {
            this.backend = createWebBackend();
        }
    }

    onChange = (v: EditorState) => {
        this.props.dispatch(new UpdateEditingPostCommand({
            ...this.props.editingPost,
            editorState: v,
        }));
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
        const editorState = this.props.editingPost.editorState;
        const plugins: Array<EditorPlugin> = [
            createToggleHeaderPlugin(this.onChange),
            createToggleListPlugin(editorState, this.onChange),
            createResetBlockAfterEnter(this.onChange),
            createInlineHotkey(editorState, this.onChange),
            createCodePlugin(editorState, this.onChange),
            createTodoPlugin(() => editorState, this.onChange),
            createImagePlugin(editorState, this.onChange),
            createSoftInsertPlugin(editorState, this.onChange),
        ];

        const plugin = mergePlugins(plugins);

        let key = this.props.state.currentPost.id;
        return (
            <Layout className='layout'>
                <Sider theme='light' width={300}>
                    <Button onClick={() => {

                    }}>测试</Button>
                    <SiderMenu/>
                </Sider>
                <Content onKeyDown={this.onSave}>
                    <Input className='title'
                           value={this.props.editingPost.title}
                           onChange={this.onTitleChange}
                           onKeyPress={this.focus}/>
                    <MyEditor ref={this.editor}
                              key={key}
                              backend={this.backend}
                              onEditableChange={this.setEditable}
                              editable={this.state.editable}
                              editorState={editorState}
                              plugin={plugin}
                              onChange={this.onChange}/>
                </Content>
            </Layout>
        );
    }

    onTitleChange = (value: ChangeEvent<HTMLInputElement>) => {
        this.props.dispatch(
            new UpdateEditingPostCommand({
                ...this.props.editingPost,
                title: value.target.value,
            })
        );
    }
}

function mapState(state: AppStore) {
    return {
        state,
        editingPost: state.currentPost,
    }
}

export default connect(mapState)(App);