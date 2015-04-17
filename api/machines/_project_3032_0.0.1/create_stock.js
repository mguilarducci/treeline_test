module.exports = {
  "inputs": {
    "userId": {
      "example": "scott",
      "friendlyName": "userId",
      "required": true
    },
    "beerId": {
      "example": "scott",
      "friendlyName": "beerId",
      "required": true
    },
    "expirationDate": {
      "example": "scott",
      "friendlyName": "expirationDate",
      "required": true
    },
    "beerName": {
      "example": "scott",
      "friendlyName": "beerName",
      "required": true
    },
    "count": {
      "example": 123,
      "friendlyName": "count",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "userId": "scott",
        "beerId": "scott",
        "expirationDate": "scott",
        "beerName": "scott",
        "count": 123,
        "id": 123,
        "createdAt": "2015-04-17T21:43:01.439Z",
        "updatedAt": "2015-04-17T21:43:01.439Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.stock.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_stock"
};