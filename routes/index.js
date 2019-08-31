var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.send({
  //   success: 1,
  //   data: 'Express',
  //   code: '10000',
  //   msg: '操作成功'
  // });
  res.render('index', { title: 'Express' });
});

module.exports = router;
