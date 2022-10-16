const router = require('koa-router')()

router.prefix('/vue3')

router.get('/swapper', function (ctx, next) {
  ctx.body = [
    'http://localhost:3000/images/car-two.png',
    'http://localhost:3000/images/car-three.png',
    'http://localhost:3000/images/car-four.png',
  ]
})

router.get('/text', function (ctx, next) {
  ctx.body = [
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
  ]
})

module.exports = router
