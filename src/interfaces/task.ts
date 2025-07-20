export interface Task{
    id: string,
    title: string,
    body: string,
    isoTime: string,
    lat?: number|null,
    lon?: number|null
}