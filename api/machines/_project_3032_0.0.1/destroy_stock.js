module.exports = {
  "inputs": {
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
        "id": 123,
        "createdAt": "2015-04-17T21:43:01.439Z",
        "updatedAt": "2015-04-17T21:43:01.439Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.stock.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_stock"
};