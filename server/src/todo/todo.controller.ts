import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { ITodo, ITodoData } from './todo.typings';
import { IQueryOptions } from '../typings';

@Controller('todo')
export class TodoController {
  constructor(private readonly appService: TodoService) {}

  @Post()
  async post(@Body() body: ITodoData): Promise<ITodo> {
    const result = await this.appService.addNew(body);
    return result;
  }

  @Get()
  async get(@Query() query: IQueryOptions): Promise<ITodo[]> {
    const result = await this.appService.getAll(query);
    return result;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ITodo> {
    const result = await this.appService.getOne(id);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ITodo> {
    const result = await this.appService.deleteOne(id);
    return result;
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() body: ITodoData,
  ): Promise<ITodoData> {
    const result = await this.appService.updateOne(id, body);
    return result;
  }
}
