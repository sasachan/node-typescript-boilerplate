import { injectable, inject } from 'inversify';
import Address from '../models/Address';
import TYPES from '../types';
import { AddressDTO } from '../dtos/AddressDTO';
import AddressRepository from '../repositories/AddressRepository';

export interface AddressService {
    getAddresses(): Promise<Array<Address>>;
    createAddress(address: Address): Promise<Address>;
    updateAddress(address: Address): Promise<Address>;
    getAddress(id: string): Promise<Address>;
}

@injectable()
export class AddressServiceImpl implements AddressService {
    @inject(TYPES.AddressRepository)
    private addressRepository: AddressRepository;

    public async getAddresses(): Promise<Array<Address>> {
        // grab addresses from mongo
        const addresses: Array<Address> = await this.addressRepository.find().then((a) => a.map((dto: AddressDTO) => this.toAddressDTO(dto)));

        return addresses;
    }

    public async createAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const createdDTO: AddressDTO = await this.addressRepository.create(addressDTO);

        return this.toAddressDTO(createdDTO);
    }

    public async updateAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const updated: AddressDTO = await this.addressRepository.updateById(addressDTO._id, addressDTO);

        return this.toAddressDTO(updated);
    }

    public async getAddress(id: string): Promise<Address> {
        const address = await this.addressRepository.findOne(id).then((a) => this.toAddressDTO(a));

        return address;
    }

    private toAddress(address: Address): AddressDTO {
        return {
            address1: address.getAddress1,
            address2: address.getAddress2,
            city: address.getCity,
            state: address.getState,
            zip: address.getZip,
            country: address.getCountry,
            createdAt: address.getCreatedAt,
            updatedAt: address.getUpdatedAt,
            _id: address.getId
        };
    }

    private toAddressDTO(addressDTO: AddressDTO): Address {
        const address =  new Address();
        address.init(
            addressDTO.address1,
            addressDTO.address2,
            addressDTO.city,
            addressDTO.state,
            addressDTO.zip,
            addressDTO.country,
            addressDTO.createdAt,
            addressDTO.updatedAt,
            addressDTO._id.toString());
            return address;
    }
}