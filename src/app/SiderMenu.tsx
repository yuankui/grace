import React from "react";
import {Button, Icon, Input} from "antd";
import TreeMenu, {TreeNodeInArray} from "react-simple-tree-menu";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {BaseAction, createCreateNewPostAction} from "../redux/actions";

interface Props {
    list: Array<TreeNodeInArray>,
    dispatch: Dispatch<BaseAction>,
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
        this.props.dispatch(createCreateNewPostAction());
    }
}

function mapStateToList(state: AppStore): Array<TreeNodeInArray> {
    const nodes: Array<TreeNodeInArray> = state.postList.map(p => {
        return {
            label: p.title,
            key: p.id,
        }
    });
    return nodes;
}

function mapState(state: AppStore) {
    return {
        state,
        list: mapStateToList(state),
    }
}

export default connect(mapState)(SiderMenu);