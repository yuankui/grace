import {Backend, Post} from "../index";
import path from 'path';
import fs from 'fs';
import {convertFromRaw} from "draft-js";
import uuid from 'uuid/v1';

export function createElectronBackend(working: string): Backend {
    return new ElectronBackend(working);
}

export class ElectronBackend implements Backend {
    private workingDir: string = "";

    constructor(workingDir: string) {
        this.workingDir = workingDir;
    }


    async getPost(id: Array<string>): Promise<Post> {
        const dirPath = path.join(this.workingDir, ...id);
        let buffer = await this.readFile(path.join(dirPath, 'index.json'));

        let text = buffer.toString('utf-8');
        let json = JSON.parse(text);
        return json;
    }

    readFile(file: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(file, ((err, data) => {
                if (err != null) {
                    reject(err);
                }
                resolve(data);
            }));
        })
    }

    listDir(path: string): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err != null) {
                    reject(err);
                }
                resolve(files);
            })
        })
    }

    async getPostTree(): Promise<Array<Post>> {
        let dirs = await this.listDir(this.workingDir);

        const posts: Array<Post> = [];

        for (let dir of dirs) {
            let post = await this.getPost([dir]);
            posts.push(post);
        }

        return posts;
    }

    writeFile(path: string, buffer: Buffer): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.writeFile(path, buffer, err => {
                if (err != null)
                    reject(err);
                resolve("");
            });
        })
    }
    async saveImage(file: File, id: Array<string>): Promise<string> {
        let imageId = uuid();
        let imagePath = path.join(this.workingDir, ...id, imageId);
        let arrayBuffer = await this.readFileAsArrayBuffer(file);
        await this.writeFile(imagePath, new Buffer(arrayBuffer));
        return imageId;
    }

    readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            let fileReader = new FileReader();

            fileReader.onload = ev => {
                resolve(fileReader.result as ArrayBuffer);
            };
            fileReader.onerror = ev => {
                reject(ev);
            };
            fileReader.onabort = ev => {
                reject(ev);
            };
            fileReader.readAsBinaryString(file);
        })
    }

    // TODO implement
    savePost(post: Post): Promise<Post> {
        if (post.id == null) {
            post.id = uuid();
        }
        let json = JSON.stringify(post);
        this.writeFile(post.)
    }

}