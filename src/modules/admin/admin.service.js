const autoBind = require("auto-bind");
const postModel = require("../post/post.model");
const adminModel = require("./admin.model");

class adminService { 
    #postModel;
    #model;
    constructor() {
        autoBind(this);
        this.#postModel = postModel
        this.#model = adminModel
    }

    

   
}