const router = require('koa-router')()

router.prefix('/vue2')

router.get('/new/list', function (ctx, next) {
  ctx.body = [
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      title: '爱在大草原 吉利豪越的设计师一定是个暖男',
      number: '3026',
      type: '导购',
      status: true
    },
  ]
})
router.get('/rank/list', function (ctx, next) {
  ctx.body = [
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
    {
      name: '哈弗H6',
      number: '1111',
      time: '近1年',
    },
  ]
})
router.get('/car/list', function (ctx, next) {
  ctx.body = [
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
    {
      img: 'http://localhost:3000/images/car-four.png',
      name: '沃尔沃'
    },
  ]
})

module.exports = router
