const autoBind = require("auto-bind");
const postModel = require("./post.model");

class postService {
    #postModel;
    constructor() {
        autoBind(this);
        this.#postModel = postModel;
    }

    async createPost(postData) {
        return await this.#postModel.create(postData);
    }
}

module.exports = new postService();