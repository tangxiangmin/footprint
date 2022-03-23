
export interface IMetaRow {
    field: string;
    type: string;
    comment: string;
}
export interface IPage {
    id: string,
    name: string, value: string,
    commonParams: IMetaRow[]
}