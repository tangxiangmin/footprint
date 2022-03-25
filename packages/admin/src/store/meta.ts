import {defineStore} from "pinia";
import {IPage, ITrackEvent, ITrackEventTemplate} from "../typings";
import {getEventTemplateList, getPageList} from "../api/meta";

type MetaStoreStateType = {
  pageList: IPage[],
  eventTemplateList: ITrackEventTemplate[],
}

export const useMetaStore = defineStore({
  id: 'meta',
  state: (): MetaStoreStateType => {
    return {
      pageList: [],
      eventTemplateList: []
    }
  },
  getters: {
    getPageEventList() {
      return (id: string) => {
        const page = this.pageList.find(row => row.id === id)
        if (!page) return []
        const eventTemplate = this.eventTemplateList.filter(template => template.pages.includes(page.value))
        const commonEventList: ITrackEvent[] = eventTemplate.map(template => {
          return {
            ...template,
            page: page.value,
            readonly: true,
          }
        })
        return [...page.eventList, ...commonEventList]
      }
    }
  },
  actions: {
    // 页面
    async fetchPageList() {
      const {data} = await getPageList()
      this.pageList = data.list
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
    },
    // 事件模板
    async fetchEventTemplateList() {
      const {data} = await getEventTemplateList()
      this.eventTemplateList = data.list
    },
    async saveEventTemplate(row: ITrackEventTemplate) {
      const id = row.id
      if (id) {
        let idx = this.eventTemplateList.findIndex(row => row.id === id)
        this.eventTemplateList.splice(idx, 1, row)
      } else {
        row.id = (+new Date()).toString()
        this.eventTemplateList.push(row)
      }
    },
    async fetchEventTemplateDetail(id: string) {
      return this.eventTemplateList.find(row => row.id === id)
    },
    async removeEventTemplate(row: ITrackEventTemplate) {
      let idx = this.eventTemplateList.indexOf(row)
      if (idx > -1) {
        this.eventTemplateList.splice(idx, 1)
      }
    },
  }
})
