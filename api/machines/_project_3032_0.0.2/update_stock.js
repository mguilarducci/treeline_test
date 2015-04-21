module.exports = {
  "inputs": {
    "userId": {
      "example": "scott",
      "friendlyName": "userId"
    },
    "beerId": {
      "example": "scott",
      "friendlyName": "beerId"
    },
    "expirationDate": {
      "example": "scott",
      "friendlyName": "expirationDate"
    },
    "beerName": {
      "example": "scott",
      "friendlyName": "beerName"
    },
    "count": {
      "example": 123,
      "friendlyName": "count"
    },
    "uniqueString": {
      "example": "scott",
      "friendlyName": "uniqueString"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Stock instances"
    }
  },
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
    env.sails.models.stock.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_stock"
};