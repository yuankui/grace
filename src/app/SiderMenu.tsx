import React from "react";
import {Button, Icon, Input, Tree} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";

const { TreeNode, DirectoryTree } = Tree;

export interface Node {
    key: string,
    title: string,
    children: Array<Node>,
}

interface Props {
    list: Array<Node>,
    dispatch: Dispatch<any>,
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
            <DirectoryTree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                switcherIcon={<Icon type="down" />}
            >
                {renderTreeNodes(this.props.list)}
            </DirectoryTree>

        </React.Fragment>
    }

    createNewPost = () => {
        this.props.dispatch(new CreateNewPostCommand(null));
    }
}

function renderTreeNodes(data: Array<Node>) {
    return data.map(item => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} {...item} />;
    });
}


function mapStateToList(state: AppStore): Array<Node> {
    let a: Array<Node> = [];

    state.posts.forEach(p => {
        if (p !== undefined) {
            a.push({
                title: p.title,
                key: p.id,
                children: [],
            })
        }
    });

    return a;
}

function mapState(state: AppStore) {
    return {
        state,
        list: mapStateToList(state),
    }
}

export default connect(mapState)(SiderMenu);