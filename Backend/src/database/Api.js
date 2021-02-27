class DatabaseApi {
    constructor(connection, name) {
        this.connection = connection;
        this.db = connection.db(name);
    }
    coll(name) {
        return this.db.collection(name)
    }
}
module.exports = DatabaseApi;