module.exports = {
  "inputs": {},
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "userId": "scott",
        "beerId": "scott",
        "expirationDate": "scott",
        "beerName": "scott",
        "count": 123,
        "uniqueString": "scott",
        "id": 123,
        "createdAt": "2015-04-20T21:38:02.415Z",
        "updatedAt": "2015-04-20T21:38:02.415Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var where = env.req.params.all();
    where = env.sails.util.omit(where, ['limit', 'skip', 'sort']);
    env.sails.models.stock.find(where).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "blueprintFind_stock"
};