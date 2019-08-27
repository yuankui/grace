import {Backend, Post} from "../index";
import uuid from "uuid";

export function createWebBackend() {
    return new WebBackend();
}

export class WebBackend implements Backend {
    private posts: Array<Post> = [];
    private postMap: {[prop: string]: Post} = {};

    async getPost(id: Array<string>): Promise<Post|null> {
        return this.postMap[id[id.length - 1]];
    }

    async getPostTree(): Promise<Array<Post>> {
        return this.posts;
    }

    saveImage(file: File, id: Array<string>): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = ev => {
                resolve(reader.result as string);
            };
            reader.onerror = ev => {
                reject(ev);
            };
            reader.onabort = ev => {
                reject(ev);
            };

            reader.readAsDataURL(file);
        })
    }

    async savePost(post: Post, parentId: Array<string>): Promise<Post> {
        let newPost = post;
        if (post.id == null) {
           newPost = {
               ...post,
               id: [...parentId, uuid()],
           }
        }

        const id = newPost.id as Array<string>;
        this.postMap[id[id.length-1]] = post;

        let parentPost = await this.getPost(parentId);
        if (parentPost != null) {
            parentPost.children.push(newPost);
        }

        return newPost;
    }

}