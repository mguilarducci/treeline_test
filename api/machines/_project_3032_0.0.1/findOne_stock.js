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
    },
    "notFound": {
      "void": true
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.stock.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_stock"
};