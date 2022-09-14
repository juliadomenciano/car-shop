import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<object[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result || undefined);
  }

  public async update(
    req: Request,
    res: Response<ICar>,
  ) {
    const { params, body } = req;
    const result = await this._service.update(params.id, body);
    return res.status(200).json(result || undefined);
  }

  public async delete(req: Request, res: Response<ICar>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result || undefined);
  }
}