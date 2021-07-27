import * as express from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import Address from '../models/Address';
import { RegistrableController } from './RegisterableController';
import { AddressService } from '../services/address.service';

@injectable()
class AddressController implements RegistrableController {
    private addressService: AddressService;

    constructor(@inject(TYPES.AddressService) addressService: AddressService) {
        this.addressService = addressService;
    }

    public register(app: express.Application, rootPath:string): void {
        app.route(`${rootPath }/address`)
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const addresses = await this.addressService.getAddresses().catch(err => next(err));
                res.json(addresses);
            })
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const address = new Address();
                address.init(
                    req.body.address1,
                    req.body.address2,
                    req.body.city,
                    req.body.state,
                    req.body.zip,
                    req.body.country,
                    new Date(),
                    new Date()
                );
                const createdAddress = await this.addressService.createAddress(address).catch(err => next(err));
                res.json(createdAddress);
            });

        app.route(`${rootPath  }/address/:id`)
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const addresses = await this.addressService.getAddress(<string> req.params.id).catch(err => next(err));
                res.json(addresses);
            })
            .put(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const address = new Address();
                address.init(
                    req.body.address1,
                    req.body.address2,
                    req.body.city,
                    req.body.state,
                    req.body.zip,
                    req.body.country,
                    req.body.createAt,
                    new Date(),
                    req.body.id,
                );
                const updatedAddress = await this.addressService.updateAddress(address).catch(err => next(err));
                res.json(updatedAddress);
            });
    }
}

export default AddressController;
