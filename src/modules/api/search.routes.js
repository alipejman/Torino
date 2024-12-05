const { Router } = require('express');
const searchController = require('./search.controller');
const router = Router();


    router.post('/search',searchController.getToures);



module.exports = {
    searchRouter: router
};