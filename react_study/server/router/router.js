const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
    res.send([
        {
            user: 'mystic',
            age: 16
        },
        {
            user: 'lucie',
            age:14
        }
    ])
    res.end()
})

module.exports = router