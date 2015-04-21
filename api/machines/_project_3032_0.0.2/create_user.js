module.exports = {
  "inputs": {
    "name": {
      "example": "scott",
      "friendlyName": "name",
      "required": true
    },
    "email": {
      "example": "scott",
      "friendlyName": "email",
      "required": true
    },
    "gravatarUrl": {
      "example": "scott",
      "friendlyName": "gravatarUrl",
      "required": true
    },
    "password": {
      "example": "scott",
      "friendlyName": "password",
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
        "name": "scott",
        "email": "scott",
        "gravatarUrl": "scott",
        "password": "scott",
        "uniqueString": "scott",
        "id": 123,
        "createdAt": "2015-04-20T21:38:42.623Z",
        "updatedAt": "2015-04-20T21:38:42.623Z"
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