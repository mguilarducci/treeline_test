module.exports = {
  "inputs": {
    "name": {
      "example": "scott",
      "friendlyName": "name",
      "required": true
    },
    "createdBy": {
      "example": "scott",
      "friendlyName": "createdBy",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "name": "scott",
        "createdBy": "scott",
        "id": 123,
        "createdAt": "2015-04-17T18:59:18.696Z",
        "updatedAt": "2015-04-17T18:59:18.696Z"
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