const mongoose = require('mongoose')

const LogRecord = mongoose.model('log_record', {
  page: String,
  eventTime: Number,
  eventType: String,
  eventValue: String,
  extra: Object,
})

function findLogs({ page = 1, pageSize = 10 } = {}) {
  return LogRecord.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean()
}

function addLog(data) {
  const row = new LogRecord(data)
  return row.save()
}

module.exports = {
  findLogs,
  addLog,
}
