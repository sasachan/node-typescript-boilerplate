import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import Environment from '../environments/environment';

export default class DbClient {

  private host: string;
  
  private port: number;
  
  private dbName: string;
  
  private options: ConnectionOptions ;

  constructor() {
    const env: Environment = new Environment();
    this.host = env.getDBHost();
    this.port = env.getDBPort();
    this.dbName = env.getDBName();

    this.options = {
      useUnifiedTopology: true,
      type: 'mongodb',
      // username: "test",
      // password: "test",
      host: this.host,
      port: this.port,
      database: this.dbName,
      entities: ['src/schemas/**/*.ts']
    };
  }

  public async connectDB(): Promise<Connection> {
    return  createConnection(this.options);
  }
}
