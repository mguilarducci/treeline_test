module.exports = {
  "inputs": {
    "email": {
      "example": "scott",
      "friendlyName": "email"
    },
    "name": {
      "example": "scott",
      "friendlyName": "name"
    },
    "password": {
      "example": "scott",
      "friendlyName": "password"
    },
    "gravatarUrl": {
      "example": "scott",
      "friendlyName": "gravatarUrl"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "email": "scott",
        "name": "scott",
        "password": "scott",
        "gravatarUrl": "scott",
        "id": 123,
        "createdAt": "2015-04-16T16:39:33.044Z",
        "updatedAt": "2015-04-16T16:39:33.044Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};