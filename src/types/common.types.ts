export interface IResponse <T> {
    code: number;
    message: string;
    data: T
}

export interface ILabelValue {
    label: string,
    value: string
}

