import React from "react";
import {Button, Icon, Input, Tree} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";
import {Post} from "../backend";

const {TreeNode} = Tree;

export interface Node {
    key: string,
    title: string,
    children: Array<Node>,
}

interface Props {
    list: Array<Node>,
    dispatch: Dispatch<any>,
    state: AppStore,
    selectedKeys: Array<string>,
    expandedKeys: Array<string>,
}


class SiderMenu extends React.Component<Props, any> {
    render() {
        return <React.Fragment>
            <div className='search-bar'>
                <Input className='input' placeholder="search"/>
                <span className='icon'>
                    <Button onClick={this.createNewPost}><Icon type="edit"/></Button>
                </span>
            </div>
            <Tree
                selectedKeys={this.props.selectedKeys}
                expandedKeys={this.props.expandedKeys}
                autoExpandParent={true}
            >
                {this.renderTreeNodes(this.props.list)}
            </Tree>

        </React.Fragment>
    }

    renderTreeNodes(data: Array<Node>) {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode className='menu-item' title={this.renderTitle(item)} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    }

    renderTitle(item: Node) {
        return <React.Fragment>
            <Button onClick={e => {
                this.props.dispatch(new CreateNewPostCommand(item.key));
                e.stopPropagation();
            }} className='plus-icon'><Icon type="plus"/></Button>
            <span>{item.title}</span>
        </React.Fragment>
    }

    createNewPost = () => {
        this.props.dispatch(new CreateNewPostCommand(null));
    }
}


function mapStateToList(state: AppStore): Array<Node> {
    let a: Array<Node> = [];

    state.posts.forEach(p => {
        if (p == null) {
            return;
        }

        if (p.parentId != null) {
            return;
        }

        a.push({
            title: p.title,
            key: p.id,
            children: expandChild(p.id, state),
        })
    });

    return a;
}

function expandChild(id: string, state: AppStore): Array<Node> {
    const post: Post | undefined = state.posts.get(id);
    if (post === undefined) {
        return [];
    }
    return post.children.map(id => {
        let child = state.posts.get(id);
        if (child == null) {
            return null;
        }
        return {
            key: id,
            title: child.title,
            children: expandChild(id, state),
        }
    })
        .filter(o => o != null) as Array<Node>;
}

function traceRoot(id: string, state: AppStore): Array<string> {
    let a = [id];
    let post = state.posts.get(id);

    while (post != null && post.parentId != null) {
        a.push(post.parentId);
        post = state.posts.get(post.parentId);
    }
    return a;
}
function mapState(state: AppStore) {
    return {
        state,
        list: mapStateToList(state),
        selectedKeys: [state.currentPost.id],
        expandedKeys: traceRoot(state.currentPost.id, state),
    }
}

export default connect(mapState)(SiderMenu);