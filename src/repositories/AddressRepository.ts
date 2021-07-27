import { injectable } from 'inversify';
import  BaseRepository  from './BaseRepository';
import AddressSchema from '../schemas/Address';

@injectable()
class AddressRepository extends BaseRepository<AddressSchema>{
//  repository specific methods will be written here
    constructor(){
        super(AddressSchema);
    }
}

export default AddressRepository;