export interface ITodoData {
  title: string;
  description?: string;
  isDone?: false;
}

export interface ITodo extends ITodoData {
  _id: string;
}

export interface ITodoRaw extends ITodo {
  __v: number;
}
