import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<object[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result || undefined);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { params, body } = req;
    const result = await this._service.update(params.id, body);
    return res.status(200).json(result || undefined);
  }

  public async delete(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result || undefined);
  }
}