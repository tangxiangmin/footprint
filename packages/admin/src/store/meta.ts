import {defineStore} from "pinia";


const EVENT_TYPE = {
  pv: 1,
  click: 2,
  duration: 3,
  exposure: 4,
  logic: 5
}

export const EVENT_MAP = Object.freeze({
  [EVENT_TYPE.pv]: {
    name: '访问',
    value: EVENT_TYPE.pv,
    cls: 'success'
  },
  [EVENT_TYPE.click]: {
    name: '点击',
    value: EVENT_TYPE.click,
    cls: 'danger'
  },
  [EVENT_TYPE.duration]: {
    name: '页面停留',
    value: EVENT_TYPE.duration,
    cls: 'warning'
  },
  [EVENT_TYPE.exposure]: {
    name: '曝光',
    value: EVENT_TYPE.exposure,
    cls: 'info'
  },
  [EVENT_TYPE.logic]: {
    name: '逻辑埋点',
    value: EVENT_TYPE.logic,
    cls: ''
  }
})


export const useMetaStore = defineStore({
  id: 'meta',
  state: () => {
    return {
      fieldList: [],
      pageList: [{name: '首页', value: 'home'}, {name: '售卖列表页', value: 'sellList'}],
      EVENT_MAP
    }
  },
  actions: {
    fetchFiledList() {
      this.fieldList = []
    }
  }
})
