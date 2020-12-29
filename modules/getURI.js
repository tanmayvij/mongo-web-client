function getUri(params) {
  var uri = 'mongodb';
  var db = params.db ? params.db : 'mongocat';
  if (params.srv) {
    uri += '+srv';
    uri += `://${params.username}:${params.password}@${params.host}/${db}?authSource=${params.authdb}`;
  }
  else {
    uri += `://${params.username}:${params.password}@${params.host}:${params.port}/${db}?authSource=${params.authdb}`;
  }
  return uri;
}

module.exports = getUri;
