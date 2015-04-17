module.exports = {
  "inputs": {
    "email": {
      "example": "scott",
      "friendlyName": "email",
      "required": true
    },
    "name": {
      "example": "scott",
      "friendlyName": "name",
      "required": true
    },
    "password": {
      "example": "scott",
      "friendlyName": "password",
      "required": true
    },
    "gravatarUrl": {
      "example": "scott",
      "friendlyName": "gravatarUrl",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "email": "scott",
        "name": "scott",
        "password": "scott",
        "gravatarUrl": "scott",
        "id": 123,
        "createdAt": "2015-04-16T16:39:33.044Z",
        "updatedAt": "2015-04-16T16:39:33.044Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};