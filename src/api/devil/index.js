const router = require('express').Router();

router.get('/devil', (req, res) => {
    res.json({c:req.cookies, h: req.headers.cookie});
})

module.exports = router;