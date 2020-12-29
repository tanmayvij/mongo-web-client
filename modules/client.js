module.exports = {
    connect: require('./middlewares/connect'),
    returnDb: require('./modules/returnDb'),
    getDBs: require('./modules/getDbs'),
    listCollections: require('./modules/listCollections'),
    dropCollection: require('./modules/dropCollection'),
    viewDocuments: require('./modules/viewDocuments'),
    addDocument: require('./modules/addDocument'),
    updateDocument: require('./modules/updateDocument'),
    deleteDocument: require('./modules/deleteDocument'),
    createCollection: require('./modules/createCollection'),
    renameCollection: require('./modules/renameCollection'),
    renameDb: require('./modules/renameDb'),
    dropDb: require('./modules/dropDb')
};