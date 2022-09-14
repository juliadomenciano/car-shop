import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockForChange, carMockForChangeWithId, carMockInvalid, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(carModel, 'update').resolves(carMockForChangeWithId);

	});

	after(() => {
		sinon.restore()
	});

	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				// a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.readOne(carMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Update Car', () => {
		it('Success', async () => {
			const carUpdated = await carService.update('62cf1fc6498565d94eba52cd', carMockForChange);
			expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
		});

		it('Failure: invalid body', async () => {
			try {
				await carService.update('62cf1fc6498565d94eba52cd', carMockInvalid);
				expect(true).to.be.false;
			} catch (error: any) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});

		it('Failure: id not found', async () => {
			sinon.restore();
			sinon.stub(carModel, 'update').rejects({ message: ErrorTypes.InvalidMongoId });
			try {
				await carService.update('123errado', carMock);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
			}
		});
	});
});