const mongoose = require("mongoose");

const EventTemplate = mongoose.model("log_meta_event_template", {
    name: String,
    pages: Array,
    eventType: Number,
    eventValue: String,
    commonParams: Array,
});


function findAllEventTemplate() {
    return EventTemplate.find();
}

function findEventTemplate(id) {
    return EventTemplate.findById(id);
}

function removeEventTemplate(id) {
    return EventTemplate.deleteOne({ _id: id });
}

function updateEventTemplate(data) {
    return EventTemplate.updateOne({ _id: data._id }, data);
}

function addEventTemplate(data) {
    const row = new EventTemplate(data);
    return row.save();
}

module.exports = {
    findAllEventTemplate,
    findEventTemplate,
    removeEventTemplate,
    updateEventTemplate,
    addEventTemplate,
};
