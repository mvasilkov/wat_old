var fs = require('fs'),
    mediatype = require('mediatype')

function aux(finder) {
    var cache = {}

    preload('/favicon.ico')
    preload('/robots.txt')

    return function (req, res, next) {
        if (cache.hasOwnProperty(req.url)) {
            var f = cache[req.url]
            res.writeHead(200, f.headers)
            res.end(f.bytes)
        }
        else next()
    }

    function preload(r) {
        var path = finder('files' + r),
            buf = fs.readFileSync(path)

        cache[r] = {
            headers: {
                'Content-Type': mediatype.lookup(r),
                'Content-Length': buf.length
            },
            bytes: buf
        }
    }
}

module.exports = aux
