import { defineStore } from "pinia";
import { IPage } from "../typings";


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


const pageList: IPage[] = [
  { id: '1', name: '首页', value: 'home', commonParams: [] },
  { id: '2', name: '售卖列表页', value: 'sellList', commonParams: [] },
]

type MetaStoreStateType = {
  fieldList: Array<any>,
  pageList: IPage[],
  EVENT_MAP: typeof EVENT_MAP,
}

export const useMetaStore = defineStore({
  id: 'meta',
  state: (): MetaStoreStateType => {
    return {
      fieldList: [],
      pageList: pageList,
      EVENT_MAP,
    }
  },
  actions: {
    fetchFiledList() {
      this.fieldList = []
    },
    async fetchPageDetail(id: string) {
      return this.pageList.find(row => row.id === id)
    },
    async savePageDetail(row: IPage) {
      const id = row.id
      if (id) {
        let idx = this.pageList.findIndex(row => row.id === id)
        this.pageList.splice(idx, 1, row)
      } else {
        row.id = (+new Date()).toString()
        this.pageList.push(row)
      }
    },
    async removePage(row: IPage) {
      const idx = this.pageList.indexOf(row)
      if (idx > -1) {
        this.pageList.splice(idx, 1)
      }
    }
  }
})
