const router = require('express').Router();

router.get('/', (req, res) => {
  const body = req.body;
  console.log(body);
  res.json({
    name: 'testing routes'
  })
})

module.exports = router;