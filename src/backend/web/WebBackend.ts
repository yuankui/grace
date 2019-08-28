import {Backend, Post} from "../index";
import uuid from "uuid";

export function createWebBackend() {
    return new WebBackend();
}

export class WebBackend implements Backend {
    private postMap: {[prop: string]: Post} = {};

    async getPost(id: string): Promise<Post|null> {
        return this.postMap[id];
    }

    async getPosts(id: string | null): Promise<Array<Post>> {
        let posts: Array<Post> = Object.entries(this.postMap)
            .map(kv => kv[1]);


        return posts.filter(p => p.parentId === id);
    }

    saveImage(file: File, id: string): Promise<string> {
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

    async savePost(post: Post, parentId: string): Promise<Post> {
        let id = post.id;
        if (post.id == null) {
           id = uuid();
        }

        let newPost: Post = {
            ...post,
            id,
            parentId
        };

        return newPost;
    }

}