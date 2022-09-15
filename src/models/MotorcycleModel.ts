import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false,
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', MotorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
