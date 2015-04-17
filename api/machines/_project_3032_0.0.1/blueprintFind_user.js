module.exports = {
  "inputs": {},
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
    var where = env.req.params.all();
    where = env.sails.util.omit(where, ['limit', 'skip', 'sort']);
    env.sails.models.user.find(where).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "blueprintFind_user"
};