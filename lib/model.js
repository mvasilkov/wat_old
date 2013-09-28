var defaults = require('../_wat.json')

function get(url) {
    return defaults.pages.hasOwnProperty(url)? defaults.pages[url]: null
}

module.exports.get = get
