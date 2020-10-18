'use strict'
var appController = require('../controllers/appController')

module.exports = function(app) {
    app.route('/').get(appController.welcome)
    app.route('/application/json').post(appController.scrapePage)
}