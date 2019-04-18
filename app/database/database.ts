import {MongoClient, Db} from 'mongodb';

export class Mongo {
    private static connection: MongoClient;

    static async db(dbname: string): Promise<Db> {
        if (!Mongo.connection) {
            Mongo.connection = await MongoClient.connect(
                'mongodb://localhost:27017', {useNewUrlParser: true}
            );
        }
        return Mongo.connection.db(dbname);
    }

}