var crc32     = require('buffer-crc32'),
    fs        = require('fs'),
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
        var path = finder('pub' + r),
            buf = fs.readFileSync(path)

        cache[r] = {
            headers: {
                'Content-Type': mediatype.lookup(r),
                'Content-Length': buf.length,
                'Cache-Control': 'public, max-age=9000000',
                'ETag': '"' + crc32(buf).toString('hex') + '"'
            },
            bytes: buf
        }
    }
}

module.exports = aux
