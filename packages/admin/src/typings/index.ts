type EventType = 1 | 2 | 3 | 4 | 5

export interface IMetaRow {
  field: string;
  type: string;
  comment: string;
}

export interface IPage {
  _id: string,
  name: string,
  value: string,
  commonParams: IMetaRow[],
  eventList: ITrackEvent[]
}

export interface ITrackEvent {
  page: string,
  name: string,
  eventType: EventType
  eventValue: string | number
  commonParams: IMetaRow[],
  readonly?: boolean,
}

export type ITrackEventTemplate = Omit<ITrackEvent, 'page'> & {
  _id?: string,
  pages: string[]
}
