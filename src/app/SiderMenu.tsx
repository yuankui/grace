import React from "react";
import {Button, Icon, Input} from "antd";
import TreeMenu, {TreeNodeInArray} from "react-simple-tree-menu";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";

interface Props {
    list: Array<TreeNodeInArray>,
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
            <TreeMenu hasSearch={false} onClickItem={(e) => console.log(e)} data={this.props.list}/>
        </React.Fragment>
    }

    createNewPost = () => {
        this.props.dispatch(new CreateNewPostCommand(null));
    }
}

function mapStateToList(state: AppStore): Array<TreeNodeInArray> {
    let a: Array<TreeNodeInArray> = [];

    state.posts.forEach(p => {
        if (p !== undefined) {
            a.push({
                label: p.title,
                key: p.id,
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