import React, {ChangeEvent, createRef, KeyboardEvent} from 'react';
import {MyEditor} from "../Editor/Editor";
import {EditorState} from "draft-js";
import './App.css';
import {Button, Input, Layout} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
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

        this.state = {
            editable: true,
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

    componentDidMount(): void {
        document.onkeydown = function(event) {
            // If Control or Command key is pressed and the S key is pressed
            // run save function. 83 is the key code for S.
            if((event.ctrlKey || event.metaKey) && event.which === 83) {
                // Save Function
                event.preventDefault();
                return false;
            }
        }
    }

    onChange = (v: EditorState) => {
        this.props.dispatch(new UpdateEditingPostCommand({
            ...this.props.editingPost,
            saved: false,
            editorState: v,
        }));
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
            <Layout className='layout' onKeyDown={event => {
                event.preventDefault();
                return false;
            }}>
                <Sider theme='light' width={300}>
                    <Button onClick={() => {

                    }}>测试</Button>
                    <SiderMenu/>
                </Sider>
                <Content
                    onKeyDown={e => e.stopPropagation()}>
                    <span>
                        <input className={'title'}
                               placeholder={"Untitled"}
                               value={this.props.editingPost.title}
                               onChange={this.onTitleChange}
                               onKeyPress={this.focus}/>
                    </span>
                    <MyEditor ref={this.editor}
                              key={key}
                              backend={this.backend}
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
                saved: false,
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