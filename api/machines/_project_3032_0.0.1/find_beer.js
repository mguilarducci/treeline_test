module.exports = {
  "inputs": {
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
        "createdBy": "scott",
        "name": "scott",
        "uniqueString": "scott",
        "id": 123,
        "createdAt": "2015-04-20T21:38:24.890Z",
        "updatedAt": "2015-04-20T21:38:24.890Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.beer.find(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "find_beer"
};