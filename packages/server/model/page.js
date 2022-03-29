const mongoose = require("mongoose");

const eventTemplate = require("./eventTemplate");

const Page = mongoose.model("log_meta_page", {
    name: String,
    value: String,
    commonParams: Array,
    eventList: Array,
});

// 合并页面和事件模板
function _formatPageEventList(page, eventTemplateList = []) {
    const eventTemplate = eventTemplateList.filter((template) =>
        template.pages.includes(page.value)
    );
    const commonEventList = eventTemplate.map((template) => {
        return {
            ...template,
            page: page.value,
            readonly: true,
        };
    });

    page.eventList = [...page.eventList, ...commonEventList];
}

async function findAllPage() {
    const [pages, eventTemplateList] = await Promise.all([
        Page.find(),
        eventTemplate.findAllEventTemplate(),
    ]);

    pages.forEach((page) => {
        _formatPageEventList(page, eventTemplateList);
    });
    return pages;
}

async function findPage(id) {
    const [page, eventTemplateList] = await Promise.all([
        Page.findById(id).lean(),
        eventTemplate.findAllEventTemplate(),
    ]);
    _formatPageEventList(page, eventTemplateList);
    return page;
}

function removePage(id) {
    return Page.deleteOne({ _id: id });
}

function updatePage(data) {
    return Page.updateOne({ _id: data._id }, data);
}

function addPage(data) {
    const row = new Page(data);
    return row.save();
}

module.exports = {
    findAllPage,
    addPage,
    findPage,
    removePage,
    updatePage,
};
