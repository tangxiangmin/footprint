const pageList = [
    {
        id: "1",
        name: "首页",
        value: "home",
        commonParams: [{ field: "id", type: "string", comment: "test" }],
        eventList: [
            {
                id: "1",
                page: "home",
                name: "访问",
                eventType: 1,
                eventValue: "",
                commonParams: [
                    { field: "uid", type: "string", comment: "test" },
                ],
            },
            {
                id: "2",
                page: "home",
                name: "点击",
                eventType: 2,
                eventValue: "btn-confirm",
                commonParams: [
                    { field: "uid", type: "string", comment: "test" },
                ],
            },
            {
                id: "11",
                // pages: ["home", "sellList"],
                page: "home",
                name: "点击购买按钮",
                eventType: 2,
                eventValue: "btn-buy",
                readonly: true,
                commonParams: [
                    { field: "name", type: "string", comment: "test" },
                ],
            },
        ],
    },
    {
        id: "2",
        name: "售卖列表页",
        value: "sellList",
        commonParams: [],
        eventList: [],
    },
];

Mock.mock(/page_list/, () => {
    return {
        code: 200,
        data: {
            list: pageList,
        },
    };
});

Mock.mock(/event_template_list/, {
    code: 200,
    data: {
        list: [
            {
                id: "1",
                pages: ["home", "sellList"],
                name: "点击购买按钮",
                eventType: 2,
                eventValue: "btn-buy",
                commonParams: [
                    { field: "uid", type: "string", comment: "test" },
                ],
            },
        ],
    },
});
