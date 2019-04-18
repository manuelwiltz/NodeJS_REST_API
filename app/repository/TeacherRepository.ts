import {RepositoryBase} from './RepositoryBase';
import {Teacher} from '../entities/entities';
import {Db, UpdateWriteOpResult} from 'mongodb'

export class TeacherRepository extends RepositoryBase<Teacher> {
    
    constructor(db: Db) {
        super(db, 'Teacher')
    }

    async count(): Promise<number> {
        return await this.collection.countDocuments({});
    }

    async findById(id: string, options?: object): Promise<any> {
        return await this.collection.findOne({_id: id}, options);
    }

    async updateById(id: string, teacher: Teacher): Promise<boolean> {
        const result: UpdateWriteOpResult = await this.collection.updateOne({_id: id}, {$set: {teacher}});
        return !!result.result.ok;
    }

}