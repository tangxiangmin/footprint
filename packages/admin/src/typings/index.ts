type EventType = 1 | 2 | 3 | 4 | 5

export interface IMetaRow {
  field: string;
  type: string;
  comment: string;
}

export interface IPage {
  id: string,
  name: string,
  value: string,
  commonParams: IMetaRow[],
  eventList: ITrackEvent[]
}

export interface ITrackEvent {
  id: string,
  page: string,
  name: string,
  eventType: EventType
  eventValue: string | number
  commonParams: IMetaRow[],
  readonly?: boolean,
}

export type ITrackEventTemplate = Omit<ITrackEvent, 'page'> & {
  pages: string[]
}
