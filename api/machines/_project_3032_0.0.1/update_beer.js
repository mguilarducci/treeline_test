module.exports = {
  "inputs": {
    "name": {
      "example": "scott",
      "friendlyName": "name"
    },
    "createdBy": {
      "example": "scott",
      "friendlyName": "createdBy"
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
        "createdBy": "scott",
        "id": 123,
        "createdAt": "2015-04-17T18:59:18.696Z",
        "updatedAt": "2015-04-17T18:59:18.696Z"
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