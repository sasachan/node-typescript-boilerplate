import { IEnvironmentConfiguration } from './environment.type';

class EnvironmentConfiguration implements IEnvironmentConfiguration {
    public host: string;

    public port: number;

    public connectionUrl: string;

    constructor(host: string, port: number, connectionUrl?: string) {
        this.host = host;
        this.port = port;
        if(connectionUrl) {
            this.connectionUrl = connectionUrl;
        }
    }
}
export default EnvironmentConfiguration;