module.exports = {
  "inputs": {
    "name": {
      "example": "scott",
      "friendlyName": "name"
    },
    "userId": {
      "example": "scott",
      "friendlyName": "userId"
    },
    "expirationDate": {
      "example": "scott",
      "friendlyName": "expirationDate"
    },
    "tried": {
      "example": true,
      "friendlyName": "tried"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Beer instances"
    }
  },
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
    env.sails.models.beer.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_beer"
};