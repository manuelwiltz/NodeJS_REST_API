import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

export class RepositoryBase<T> {

    readonly collection: Collection;

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    async find(item: T, options?: object): Promise<any[]> {
        return await this.collection.find(item, options).toArray();
    }

    async findOne(id: string, options?: object): Promise<any|null> {
        return await this.collection.findOne({id}, options);
    }

    async findAll(): Promise<any[]> {
        return await this.collection.find({}).toArray();
    }

    async create(item: T): Promise<boolean> {
        const result = await this.collection.insertOne(item);
        return !!result.result.ok;
    }

    async createMany(item: T[]): Promise<boolean> {
        const result = await this.collection.insertMany(item);
        return !!result.result.ok;
    }

    async update(id: string, item: T): Promise<boolean> {
        const result = await this.collection.updateOne({ _id: new ObjectId(id) }, item);
        return !!result.result.ok;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({id});
        return !!result.result.ok;
    }


}