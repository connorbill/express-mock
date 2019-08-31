var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

router.get('/home/shop', function(req, res, next) {
  var data = Mock.mock({
    'list|2': [
      {
        'id|+1': 1,
        'serial_number|1-100': 1,
        'warn_number|1-100': 1,
        'warn_name|1': ['报警类型1', '报警类型2', '报警类型3'],
        'warn_level|1': ['紧急', '重要'],
        warn_detail: '环境IP:10.114.123.12,服务名称:XX',
        create_time: Random.datetime(),
        finish_time: Random.datetime(),
        'contact|4': 'abc'
        
      }
    ]
  });

  res.send({
    data: data.list,
    code: '10000',
    msg: '操作成功'
  });
});

// router.get('/article/list', function (req, res) {
//   res.json({'art': 'art'})
// })

router.get("/home/info",function (req,res) {
  console.log(req.body);
  //调用mock方法模拟数据
  var data = Mock.mock({
          // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
          'list|1-10': [{
              // 属性 id 是一个自增数，起始值为 1，每次增 1
              'id|+1': 1
          }]
      }
  );

  res.send({
    data: data,
    code: '10000',
    msg: '操作成功'
  });
})


router.get("/home/books",function (req,res) {
  console.log(req.body);
  //调用mock方法模拟数据
  var data = Mock.mock({
          // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
          'list|1-2': [{
              // 属性 id 是一个自增数，起始值为 1，每次增 1
              'id|+1': 1
          }]
      }
  );
  res.send({
    data: data,
    code: '10000',
    msg: '操作成功'
  });
})


module.exports = router;