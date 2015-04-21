module.exports = {
  "inputs": {
    "createdBy": {
      "example": "scott",
      "friendlyName": "createdBy",
      "required": true
    },
    "name": {
      "example": "scott",
      "friendlyName": "name",
      "required": true
    },
    "uniqueString": {
      "example": "scott",
      "friendlyName": "uniqueString",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "createdBy": "scott",
        "name": "scott",
        "uniqueString": "scott",
        "id": 123,
        "createdAt": "2015-04-20T21:38:24.890Z",
        "updatedAt": "2015-04-20T21:38:24.890Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.beer.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_beer"
};