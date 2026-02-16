import {MongoClient} from 'mongodb'
import DatabaseApi from './Api.js'
const connect = async ({
    host,
    port,
    name,
    user,
    password,
  authenticate
  }) => {
    const url = authenticate
    ? `mongodb://${user}:${password}@${host}:${port}/${name}`
    : `mongodb://${host}:${port}`;
    const client = new MongoClient(url);
    await client.connect();

    return new DatabaseApi(client, name)
}
export default connect;