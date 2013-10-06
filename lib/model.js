var fs    = require('fs'),
    iosys = require('iosys'),
    util  = require('lodash'),
    obj   = {}

function load(f) {
    return JSON.parse(fs.readFileSync(f, {encoding: 'utf-8'}))
}

function update(a, b) {
    if (a.pages) {
        util.defaults(a.pages, b.pages)
        return a
    }
    return b
}

function init(finder) {
    obj = finder.mapReduce('_wat.json', load, update, obj)
}

function get(url) {
    return obj.pages && obj.pages.hasOwnProperty(url)? obj.pages[url]: null
}

function reset() { obj = {} }

module.exports.init = init
module.exports.get = get
module.exports.reset = reset
