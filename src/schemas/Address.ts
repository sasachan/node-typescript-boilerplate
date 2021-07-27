import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AddressDTO } from '../dtos/AddressDTO';

@Entity('addresses')
class AddressSchema {
    @PrimaryColumn()
    // tslint:disable-next-line:variable-name
    public _id?: string;

    @Column()
    public address1: string;

    @Column()
    public address2?: string;

    @Column()
    public city: string;

    @Column()
    public state: string;

    @Column()
    public zip: string;

    @Column()
    public country: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}

export default AddressSchema;
