export interface IRequest<IDataDto, IDataSuccess, IError> {
    data: IDataDto;
    success: (data: IDataSuccess) => void;
    error: (err: IError) => void;
  }