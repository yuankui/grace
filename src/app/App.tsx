import React, {ChangeEvent, createRef, KeyboardEvent} from 'react';
import {MyEditor} from "../Editor/Editor";
import {EditorState} from "draft-js";
import './App.css';
import {Button, Layout} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import './menu.css';
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
import {SyncPostCommand} from "../redux/commands/SyncPostCommand";
import {SavePostCommand} from "../redux/commands/SavePostCommand";

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

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();

        this.state = {
            editable: true,
        };
    }

    componentDidMount(): void {
        document.addEventListener("keydown", function (event) {
            // If Control or Command key is pressed and the S key is pressed
            // run save function. 83 is the key code for S.
            if ((event.ctrlKey || event.metaKey) && event.which === 83) {
                // Save Function
                event.preventDefault();
                return false;
            }
        });
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
                    onBlur={() => {
                        this.props.dispatch(new SyncPostCommand());
                        this.props.dispatch(new SavePostCommand(this.props.editingPost.id))
                    }}
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
                              backend={this.props.state.backend}
                              editable={this.state.editable}
                              editorState={editorState}
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