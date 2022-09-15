import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async read(): Promise<object[]> {
    const motorcycle = await this._motorcycle.read();
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async delete(_id: string): Promise<{ status?: boolean 
  | undefined; model: string; year: number; color: string;
  buyValue: number; category: 'Street' | 'Custom' | 'Trail'; engineCapacity: number; } | null> {
    const motorcycle = await this._motorcycle.delete(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._motorcycle.update(_id, parsed.data);
    if (!result) {
      throw new Error('Unknown error');
    }
    return result;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(obj);
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }
}

export default MotorcycleService;