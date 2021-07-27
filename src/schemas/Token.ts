import {
    ObjectID,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn
  } from 'typeorm';
  

  @Entity('tokens')
  class Token {
    @ObjectIdColumn()
    _id: ObjectID;
  
    @Column()
    token: string;
  
    @Column()
    user: string;
  
    @Column()
    type: string;
  
    @Column()
    expires: Date;

    @Column()
    blacklisted: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
  export default Token;