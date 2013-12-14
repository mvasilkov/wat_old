var fs = require('fs'),
    fmt = require('rssi'),
    mediatype = require('mediatype'),
    model = require('./model')

function render(finder) {
    function read(p, res, next) {
        var f = finder('docs/' + p.r)
        if (f) fs.stat(f, function (err, fd) {
            if (err) next()
            else {
                res.set('Content-Type', mediatype.lookup(p.r))
                res.set('Content-Length', fd.size)
                fs.createReadStream(f).pipe(res)
            }
        })
        else next()
    }

    function recur(b, done, arr, res) {
        var p
        if (arr && res) {
            if (arr.length) {
                p = arr.pop()
                resolve(b[p], function (err, page) {
                    if (err) done(err)
                    else {
                        res['b_' + p] = page
                        recur(b, done, arr, res)
                    }
                })
            }
            else done(0, res)
        }
        else recur(b, done, Object.keys(b), {})
    }

    function resolve(p, done) {
        var f, enc = {encoding: 'utf8'}
        if (p.hasOwnProperty('r')) {
            if (p.hasOwnProperty('b')) {
                f = finder('_wat/' + p.r)
                if (f) fs.readFile(f, enc, function (err, page) {
                    if (err) done(err)
                    else recur(p.b, function (err, b) {
                        if (err) done(err)
                        else done(0, fmt(page)(b))
                    })
                })
                else done('err')
            }
            else {
                f = finder('docs/' + p.r)
                if (f) fs.readFile(f, enc, done)
                else done('err')
            }
        }
        else done('err')
    }

    function wrap(p, res, next) {
        resolve(p, function (err, page) {
            if (err) next()
            else {
                res.set('Content-Type', mediatype.lookup(p.r))
                res.set('Content-Length', Buffer.byteLength(page))
                res.end(page)
            }
        })
    }

    model.init(finder)

    return function (req, res, next) {
        var p = model.get(req.url.substr(1))
        if (p) {
            if (p.hasOwnProperty('r'))
                return (p.hasOwnProperty('b')? wrap: read)(p, res, next)
            if (p.hasOwnProperty('redir'))
                return res.redirect(301, p.redir)
        }
        next()
    }
}

module.exports = render
