import http, {BaseResponse} from '../utils/request'
import {IPage, ITrackEventTemplate} from "../typings";

export function getPageList(){
  return http.get<any, BaseResponse<{list:IPage[]}>>('/meta/page_list')
}

export function getEventTemplateList(){
  return http.get<any, BaseResponse<{list:ITrackEventTemplate[]}>>('/meta/event_template_list')

}
