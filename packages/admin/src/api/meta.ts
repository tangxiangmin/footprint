import http, {BaseResponse} from '../utils/request'
import {IPage, ITrackEventTemplate} from "../typings";

// page
export function getPageList() {
  return http.get<any, BaseResponse<{ list: IPage[] }>>('/log/page_list')
}

export function getPageDetail(id: string) {
  return http.get<any, BaseResponse<IPage>>(`/log/page/${id}`)
}

export function addPage(data: IPage) {
  return http.post<any, BaseResponse<any>>(`/log/page`, data)
}

export function updatePage(data: IPage) {
  return http.put<any, BaseResponse<any>>(`/log/page`, data)
}

export function removePage(id: string) {
  return http.delete<any, BaseResponse<any>>(`/log/page/${id}`)
}

// eventTemplate
export function getEventTemplateList() {
  return http.get<any, BaseResponse<{ list: ITrackEventTemplate[] }>>('/log/event_template_list')
}

export function getEventTemplateDetail(id: string) {
  return http.get<any, BaseResponse<ITrackEventTemplate>>(`/log/event_template/${id}`)
}

export function addEventTemplate(data: ITrackEventTemplate) {
  return http.post<any, BaseResponse<any>>(`/log/event_template`, data)
}

export function updateEventTemplate(data: ITrackEventTemplate) {
  return http.put<any, BaseResponse<any>>(`/log/event_template`, data)
}

export function removeEventTemplate(id: string) {
  return http.delete<any, BaseResponse<any>>(`/log/event_template/${id}`)

}

