module.exports = {
  "inputs": {},
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "name": "scott",
        "userId": "scott",
        "expirationDate": "scott",
        "tried": true,
        "id": 123,
        "createdAt": "2015-04-16T18:35:23.356Z",
        "updatedAt": "2015-04-16T18:35:23.356Z"
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
    env.sails.models.beer.find(where).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "blueprintFind_beer"
};