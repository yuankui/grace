import {ContentState, RawDraftContentState} from "draft-js";

export interface Backend {
    /**
     * 存储图像，返回url
     * @param file
     */
    saveImage(file: File, id: Array<string>): Promise<string>;

    /**
     * 获取文章属性结构
     */
    getPostTree(): Promise<Array<Post>>,

    /**
     * 保存文章
     * @param post
     */
    savePost(post: Post, parentId: Array<string>): Promise<Post>,

    /**
     * 获取文章详情
     * @param id
     */
    getPost(id: Array<string>): Promise<Post|null>,
}

export interface Post {
    /**
     * id组成规则，创建时间
     */
    id: Array<string> | null,
    title: string,
    tags: Array<string>,
    content: RawDraftContentState,
    children: Array<Post>,
}