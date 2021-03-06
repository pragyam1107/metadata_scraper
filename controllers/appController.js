'use strict'
// const _ = require('lodash')
const async = require('async')
const cheerio = require('cheerio')
const request = require('request')
const flatCache = require('flat-cache')
let cache = flatCache.load('url')

exports.welcome = function (req, res) {
    let welcome = `This is an express application that scrapes metadata from websites.
    Major functionalities -
    Scrapes metadata of website
    Uses caching for faster performance
    POST https://metadatascraper1.herokuapp.com/application/json
    Sample request:
    {
        "url": "https://stackoverflow.com/questions/48900331/node-js-puppeteer-metadata"
    }
    
    Sample Response: 
    {
        "status": "success",
        "message": {
            "title": "node.js - node js puppeteer metadata - Stack Overflow",
            "description": "I am new to Puppeteer, and I am trying to extract meta data from a Web site using Node.JS and Puppeteer. I just can't seem to get the syntax right. The code below works perfectly extracting the Title",
            "images": [
                "https://i.stack.imgur.com/MzQwC.jpg?s=32&g=1",
                "https://www.gravatar.com/avatar/95dbf829bd1b1b9ded1dc3bf29638aca?s=32&d=identicon&r=PG&f=1",
                "https://www.gravatar.com/avatar/080e2938da348f9045d1ee6e521c2b9f?s=32&d=identicon&r=PG"
            ]
        }
    }`
    res.send(welcome)
}

exports.scrapePage = function (req, res) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (req.body && req.body.url && pattern.test(req.body.url)) {
        async.waterfall([
            function (callback) {
                let cacheContent = cache.getKey(req.body.url)
                if (cacheContent) {
                    callback(null, cacheContent)
                } else {
                    callback(null, null)
                }               
            },
            function (value, callback) {
                if (!value) {
                    request({
                        url: req.body.url,
                        method: 'GET'
                    }, function (error, response, body) {
                        if (error | response.statusCode != 200) {
                            console.log(error)
                            callback("Failed to load website")
                        } else {
                            if (!body.title && !body.description && !body.images && !body.html) {
                                let $ = cheerio.load(body)
                                // console.log(response)
                                const getMetatag = (name) =>  
                                    $(`meta[name=${name}]`).attr('content') ||  
                                    $(`meta[name="og:${name}"]`).attr('content') ||  
                                    $(`meta[name="twitter:${name}"]`).attr('content')
                                const desc = $('head').text().replace(/\n/g, '').replace(/  /g, '')
                                var images = $('img').map(function(i, el) {
                                    // this === el
                                    return $(this).attr('src');
                                }).get()
                                let finalobject = { 
                                    title: $('title').first().text()?$('title').first().text():(getMetatag("title")?getMetatag("title"):"not present"),
                                    description: getMetatag('description')?getMetatag('description'):(desc?desc:"not present"),
                                    images: getMetatag('image')?getMetatag('image'):(images?images:"not present")
                                }
                                cache.setKey(req.body.url, finalobject)
                                cache.save()
                                // console.log(finalobject)
                                callback(null,finalobject)
                            } else if (body.title || body.description || body.images) {
                                let finalobject = { 
                                    title: body.title?body.title:"not present",
                                    description: body.description?body.description:"not present",
                                    images: body.images?body.images:"not present"
                                }
                                cache.setKey(req.body.url, finalobject)
                                cache.save()
                                // console.log(finalobject)
                                callback(null,finalobject)
                            }
                        }
                    })
                } else {
                    callback(null, value)
                }
            }
        ], function (error, final) {
            if (error) {
                res.send({
                    status: "failure",
                    message: error
                })
            } else {
                res.send({
                    status: "success",
                    message: final
                })
            }
        })
    } else {
        res.send({
            status: "failure",
            message: "insufficient request or incorrect format of url"
        })
    }
}