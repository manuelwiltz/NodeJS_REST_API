import {RepositoryBase} from './RepositoryBase';
import {Schoolclass} from '../entities/entities';
import {Db, UpdateWriteOpResult} from 'mongodb'

export class SchoolclassRepository extends RepositoryBase<Schoolclass> {
    
    constructor(db: Db) {
        super(db, 'Schoolclass')
    }

    async count(): Promise<number> {
        return await this.collection.countDocuments({});
    }

    async findById(id: string, options?: object): Promise<any> {
        return await this.collection.findOne({_id: id}, options);
    }

    async updateById(id: string, schoolclass: Schoolclass): Promise<boolean> {
        const result: UpdateWriteOpResult = await this.collection.updateOne({_id: id}, {$set: {schoolclass}});
        return !!result.result.ok;
    }
}



