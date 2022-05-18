const path = require('path');
const mainController = {

    index: (req, res, next) => {
        res.render('index');
    }
};

module.exports = mainController;