function html(arg) {
    return arg.replace(/[&<]/g, function (r) {
        return r == '&'? '&amp;': '&lt;'
    })
}

function attr(arg) {
    return arg.replace(/["&<]/g, function (r) {
        return r == '"'? '&quot;': r == '&'? '&amp;': '&lt;'
    })
}

module.exports.html = html
module.exports.attr = attr
