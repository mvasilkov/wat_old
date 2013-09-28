var assert = require('assert'),
    esc = require('../lib/esc.js')

function eq(a, b) { assert.strictEqual(a, b) }

describe('esc', function () {
    it('should escape HTML', function () {
        eq(esc.html('<Plug & Play>'), '&lt;Plug &amp; Play>')
        eq(esc.html('<?php "programming" language ?>'),
            '&lt;?php "programming" language ?>')
    })

    it('should escape HTML attributes', function () {
        eq(esc.attr('<Plug & Play>'), '&lt;Plug &amp; Play>')
        eq(esc.attr('<?php "programming" language ?>'),
            '&lt;?php &quot;programming&quot; language ?>')
    })
})
