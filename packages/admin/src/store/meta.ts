import {defineStore} from "pinia";
import {IPage, ITrackEvent, ITrackEventTemplate} from "../typings";
import {
  getPageList, getPageDetail, addPage, updatePage, removePage,
  getEventTemplateList, getEventTemplateDetail, addEventTemplate, updateEventTemplate, removeEventTemplate
} from "../api/meta";

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
  actions: {
    // 页面
    async fetchPageList() {
      const {data} = await getPageList()
      this.pageList = data.list
    },
    async fetchPageDetail(id: string) {
      const {data} = await getPageDetail(id)
      return data
    },
    async savePageDetail(row: IPage) {
      const id = row._id
      return id ? updatePage(row) : addPage(row)
    },
    async removePage(row: IPage) {
      return removePage(row._id)
    },
    // 事件模板
    async fetchEventTemplateList() {
      const {data} = await getEventTemplateList()
      this.eventTemplateList = data.list
    },
    async saveEventTemplate(row: ITrackEventTemplate) {
      const id = row._id
      return id ? updateEventTemplate(row) : addEventTemplate(row)
    },
    async fetchEventTemplateDetail(id: string) {
      return getEventTemplateDetail(id)
    },
    async removeEventTemplate(row: ITrackEventTemplate) {
      if(row._id){
        return removeEventTemplate(row._id)
      }
    },
  }
})
