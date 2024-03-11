const Router = require('koa-router')

const page = require('./model/page')

const eventTemplate = require('./model/eventTemplate')

const logRecord = require('./model/log')

const traceParams = require('./model/traceParams')

const router = new Router()

// page
router.get('/log/page_list', async (ctx, next) => {
  const res = await page.findAllPage()

  ctx.body = {
    code: 200,
    msg: 'success',
    data: {
      list: res,
    },
  }
})

router.get('/log/page/:id', async (ctx, next) => {
  const { id } = ctx.request.params
  const res = await page.findPage(id)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.post('/log/page', async (ctx, next) => {
  const data = ctx.request.body
  const res = await page.addPage(data)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.put('/log/page', async (ctx, next) => {
  const data = ctx.request.body
  const res = await page.updatePage(data)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.delete('/log/page/:id', async (ctx, next) => {
  const { id } = ctx.request.params
  const res = await page.removePage(id)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

// eventTemplate
router.get('/log/event_template_list', async (ctx, next) => {
  const res = await eventTemplate.findAllEventTemplate()

  ctx.body = {
    code: 200,
    msg: 'success',
    data: {
      list: res,
    },
  }
})

router.get('/log/event_template/:id', async (ctx, next) => {
  const { id } = ctx.request.params
  const res = await eventTemplate.findEventTemplate(id)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.post('/log/event_template', async (ctx, next) => {
  const data = ctx.request.body
  const res = await eventTemplate.addEventTemplate(data)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.put('/log/event_template', async (ctx, next) => {
  const data = ctx.request.body
  const res = await eventTemplate.updateEventTemplate(data)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.delete('/log/event_template/:id', async (ctx, next) => {
  const { id } = ctx.request.params
  const res = await eventTemplate.removeEventTemplate(id)

  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.get('/log/report', async (ctx, next) => {
  const query = ctx.request.query
  await logRecord.addLog(query)
  ctx.body = {
    code: 200,
    msg: 'success',
  }
})

router.post('/log/report', async (ctx, next) => {
  const params = ctx.request.body
  await logRecord.addLog(params)
  ctx.body = {
    code: 200,
    msg: 'success',
  }
})
router.get('/log/log_record_list', async (ctx, next) => {
  const params = ctx.request.body
  const res = await logRecord.findLogs(params)
  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

// traceParams
router.get('/log/trace_params_list', async (ctx, next) => {
  const res = await traceParams.findAll()

  ctx.body = {
    code: 200,
    msg: 'success',
    data: {
      list: res,
    },
  }
})
router.post('/log/trace_params', async (ctx, next) => {
  const data = ctx.request.body
  const res = await traceParams.addOne(data)
  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})
router.put('/log/trace_params', async (ctx, next) => {
  const data = ctx.request.body
  const res = await traceParams.updateOne(data)
  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

router.delete('/log/trace_params/:id', async (ctx, next) => {
  const { id } = ctx.request.params
  const res = await traceParams.removeOne(id)
  ctx.body = {
    code: 200,
    msg: 'success',
    data: res,
  }
})

module.exports = router
