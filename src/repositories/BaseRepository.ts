
import { getRepository, Repository, EntityTarget } from 'typeorm';
import { injectable, unmanaged } from 'inversify';
import isValidSchema from '../utils/schemaValidation';

@injectable()
 class BaseRepository<T> {
    public repository: Repository<T>;

    constructor(@unmanaged() repo: EntityTarget<T>) {
        this.repository = getRepository(repo);
    }

    // Base Repository will contain common methods
    public async save(obj: T): Promise<T> {
        const model = this.repository.create(obj);
        if (!await isValidSchema(model as Record<string,unknown>)) {
            throw new Error('Bad Request');
          }
        return this.repository.save(model);
    }

    public async find(): Promise<T[]> {
        return this.repository.find();
    }

    public async findOne(id: string): Promise<T> {
        return this.repository.findOne(id);
    }

    public async findOneWithFilter(obj: T): Promise<T> {
        return this.repository.findOne(obj);
    }

    public async create(obj: T): Promise<T> {
        const model = this.repository.create(obj);
        if (!await isValidSchema(model as Record<string,unknown>)) {
            throw new Error('Bad Request');
          }
        return this.repository.save(model);
    }

    public async updateById(id:string, obj: T): Promise<T> {
        await this.repository.update(id, obj);
        const result = await this.findOne(id);
        return result;
    }

}

export default BaseRepository;