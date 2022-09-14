import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
	model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockForChange: ICar = {
	model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockForChangeWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
	model: "Ferrari Maranello",
  year: 1963,
  color: "blue",
  buyValue: 3300000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockInvalid: any = {
  model: "Ferrari Maranello",
  year: 1800,
  color: "blue",
  buyValue: 3300000,
  seatsQty: 2,
  doorsQty: 2
}

export {
	carMock,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
	carMockInvalid,
};