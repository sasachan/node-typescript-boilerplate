import * as fs from 'fs';
import { config as configDotenv } from 'dotenv';
import * as path from 'path';
import { IEnvironmentConfiguration } from './environment.type';
import EnvironmentConfiguration from './environment.model';
import { Environments } from './environment.constant';
import { IGlobal } from '../custom';

declare const global: IGlobal;
type envConfig = Record<string, string | undefined>;
class Environment {
    rootPath: string;
    
    processEnv: envConfig;

    constructor() {

        this.rootPath = global.__rootdir;

        this.processEnv = process.env;
    }

    public currentEnvironment(): string {
        let environment: string = this.processEnv.NODE_ENV || Environments.DEV;

        if (!environment) {
            environment = Environments.LOCAL;
        }
        switch (environment) {
            case Environments.PRODUCTION:
                return Environments.PRODUCTION;
            case Environments.DEV:
                return Environments.DEV;
            case Environments.TEST:
            case Environments.QA:
                return Environments.TEST;
            case Environments.STAGING:
                return Environments.STAGING;
            case Environments.LOCAL:
            default:
                return Environments.LOCAL;
        }
    }

    public isProduction(): boolean {
        return this.currentEnvironment() === Environments.PRODUCTION;
    }

    public getDBHost(): string {
        return this.processEnv.DB_HOST;
    }

    public getDBPort(): number {
        return parseInt(this.processEnv.DB_PORT, 10);
    }

    public getDBName(): string {
        return this.processEnv.DB_NAME;
    }


    public getSecret(): string {
        switch (this.currentEnvironment()) {
            case Environments.PRODUCTION:
                return this.processEnv.JWT_SECRET;
            case Environments.DEV:
                return this.processEnv.JWT_SECRET;
            default:
                return this.processEnv.JWT_SECRET;
        }
    }


    public getAccessExpirationMinutes(): string {
        switch (this.currentEnvironment()) {
            case Environments.PRODUCTION:
                return this.processEnv.JWT_ACCESS_EXPIRATION_MINUTES;
            case Environments.DEV:
                return this.processEnv.JWT_ACCESS_EXPIRATION_MINUTES;
            default:
                return this.processEnv.JWT_ACCESS_EXPIRATION_MINUTES;
        }
    }



    public getRefreshExpirationDays(): string {
        switch (this.currentEnvironment()) {
            case Environments.PRODUCTION:
                return this.processEnv.JWT_REFRESH_EXPIRATION_DAYS;
            case Environments.DEV:
                return this.processEnv.JWT_REFRESH_EXPIRATION_DAYS;
            default:
                return this.processEnv.JWT_REFRESH_EXPIRATION_DAYS;
        }
    }


    public getConfiguration(): IEnvironmentConfiguration {
        const currentEnvironment: string = this.currentEnvironment();
        switch (currentEnvironment) {
            case Environments.PRODUCTION:
                return new EnvironmentConfiguration(this.processEnv.HOST, Number(this.processEnv.PORT));
            case Environments.TEST:
                return new EnvironmentConfiguration(this.processEnv.HOST, Number(this.processEnv.PORT));
            case Environments.STAGING:
                return new EnvironmentConfiguration(this.processEnv.HOST, Number(this.processEnv.PORT));
            case Environments.LOCAL:
                return new EnvironmentConfiguration(this.processEnv.HOST, Number(this.processEnv.PORT));
            default:
                return null;
        }
    }

    public setEnvironment(env: string): void {
        let envPath;
        switch (env) {
            case Environments.PRODUCTION:
                envPath = path.resolve(this.rootPath, '.env.prod');
                break;
            case Environments.TEST:
                envPath = path.resolve(this.rootPath, '.env.test');
                break;
            case Environments.STAGING:
                envPath = path.resolve(this.rootPath, '.env.stag');
                break;
            case Environments.LOCAL:
                envPath = path.resolve(this.rootPath, '.env');
                break;
            default:
                envPath = path.resolve(this.rootPath, '.env');
        }
        if (!fs.existsSync(envPath)) {
            throw new Error('.env file is missing in root directory');
        }
        configDotenv({ path: envPath });
    }
}

export default Environment;