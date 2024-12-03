export interface TodoRequestDto {
    TaskId:string,
    TaskDescription: string,
    TaskCreatedDate: Date,
    IsTaskCompleted: boolean,
    TaskCompletedDate: Date,
    IsTaskDeleted: boolean,
    TaskDeletedDate: Date,
}