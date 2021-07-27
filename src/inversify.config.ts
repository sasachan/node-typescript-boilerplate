import { Container } from 'inversify';
import { AddressController } from './controllers/address.controller';
import { RegistrableController } from './controllers/RegisterableController';
import AddressRepository from './repositories/AddressRepository';
import { AddressService, AddressServiceImpl } from './services/address.service';
import TYPES from './types';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepository).inSingletonScope();

export default container;