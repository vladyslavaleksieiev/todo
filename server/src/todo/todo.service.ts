import { Injectable, HttpException } from '@nestjs/common';
import { Types } from 'mongoose';

import { ITodo, ITodoData, ITodoRaw } from './todo.typings';
import { Todo } from './todo.model';
import { parseMongoError } from '../services/helpers';
import { IQueryOptions } from '../typings';

@Injectable()
export class TodoService {
  async addNew(data: ITodoData): Promise<ITodo> {
    const { title, description, isDone } = data;

    const todo = {
      _id: new Types.ObjectId().toHexString(),
      title,
      description,
      isDone,
    };

    try {
      await new Todo(todo).save();
      return todo;
    } catch (mongoError) {
      const error = parseMongoError(mongoError);
      throw new HttpException(error, error.status);
    }
  }

  async getAll(query: IQueryOptions): Promise<ITodo[]> {
    const todoList = await Todo.find();

    let result = todoList.map((el) => {
      const rawEl = <ITodoRaw>el.toJSON();

      delete rawEl.__v;

      return rawEl;
    });

    if (query.offset) {
      result = result.slice(query.offset);
    }
    if (query.limit) {
      result = result.slice(0, query.limit);
    }

    return result;
  }

  async getOne(id: string): Promise<ITodo> {
    const result = await this.findOne(id);
    return result;
  }

  async deleteOne(_id: string): Promise<ITodo> {
    const result = await this.findOne(_id);
    try {
      await Todo.deleteOne({ _id });
      return result;
    } catch (mongoError) {
      const error = parseMongoError(mongoError);
      throw new HttpException(error, error.status);
    }
  }

  async updateOne(_id: string, data: ITodoData): Promise<ITodo> {
    try {
      await Todo.updateOne({ _id }, data);
    } catch (mongoError) {
      const error = parseMongoError(mongoError);
      throw new HttpException(error, error.status);
    }

    const result = await this.findOne(_id);
    return result;
  }

  private async findOne(id: string): Promise<ITodo> {
    try {
      const todo = await Todo.findById(id);

      const result = <ITodoRaw>todo.toJSON();
      delete result.__v;
      return result;
    } catch (mongoError) {
      const error = parseMongoError(mongoError);
      throw new HttpException(error, error.status);
    }
  }
}
