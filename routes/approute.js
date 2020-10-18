'use strict'
var appController = require('../controllers/appController')

module.exports = function(app) {
    app.route('/application/json').post(appController.scrapePage)
}