const autoBind = require("auto-bind");
const postModel = require("./post.model");
const createHttpError = require("http-errors");
const postMessages = require("./post.message");

class postService {
    #postModel;
    constructor() {
        autoBind(this);
        this.#postModel = postModel;
    }

    async createPost(postData) {
        return await this.#postModel.create(postData);
    }

    
    async updatePost(postId, updateData) {
        return await this.#postModel.findByIdAndUpdate(postId, updateData, { new: true });
    }

    async deletePost(postId) {
        return await this.#postModel.findByIdAndDelete(postId);
    }

    async getPostById(postId) {
        const post = await this.#postModel.findById(postId);
        if(!post) throw new createHttpError(404, postMessages.notFound);
        return post;
    }
}

module.exports = new postService();