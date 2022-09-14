import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async read(): Promise<object[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async delete(_id: string): Promise<{ status?: boolean 
  | undefined; model: string; year: number; color: string;
  buyValue: number; doorsQty: number; seatsQty: number; } | null> {
    const car = await this._car.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._car.update(_id, obj);
    if (!result) {
      throw new Error('Unknown error');
    }
    return result;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarService;