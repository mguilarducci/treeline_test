var Machine = require("machine");
module.exports = {
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Log out
                sails.machines['63fcae7b-edc4-4591-85b7-ba4863aa367e_0.2.3'].logout({}).setEnvironment({
                    req: req
                }).exec({
                    "error": function(logOut) {
                        return exits.error({
                            data: logOut,
                            status: 500
                        });

                    },
                    "success": function(logOut) {
                        return exits.respond({
                            data: "/signup",
                            action: "redirect",
                            status: 200
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};