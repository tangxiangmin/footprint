const mongoose = require('mongoose')

const TraceParams = mongoose.model('log_meta_trace_params', {
  name: String,
  utmSource: String,
  utmCampaign: String,
})

function findAll() {
  return TraceParams.find().lean()
}

function findOne(id) {
  return TraceParams.findById(id)
}

function removeOne(id) {
  return TraceParams.deleteOne({ _id: id })
}

function updateOne(data) {
  return TraceParams.updateOne({ _id: data._id }, data)
}

function addOne(data) {
  const row = new TraceParams(data)
  return row.save()
}

module.exports = {
  findAll,
  findOne,
  removeOne,
  updateOne,
  addOne,
}
