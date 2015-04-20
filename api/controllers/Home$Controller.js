var Machine = require("machine");
module.exports = {
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Check login status
                sails.machines['63fcae7b-edc4-4591-85b7-ba4863aa367e_0.2.3'].checkLogin({}).setEnvironment({
                    req: req
                }).exec({
                    "error": function(checkLoginStatus) {
                        return exits.error({
                            data: checkLoginStatus,
                            status: 500
                        });

                    },
                    "otherwise": function(checkLoginStatus) {
                        return exits.respond({
                            data: "/signup",
                            action: "redirect",
                            status: "200"
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // Find One User
                        sails.machines['_project_3032_0.0.1'].findOne_user({
                            "criteria": {
                                email: (req.session.me ? (req.session.me + '') : '')
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                return exits.respond({
                                    data: {
                                        me: {
                                            name: (findOneUser && findOneUser.name),
                                            gravatarUrl: (findOneUser && findOneUser.gravatarUrl)
                                        }
                                    },
                                    action: "display_view",
                                    status: 200,
                                    view: "dashboard"
                                });

                            },
                            "error": function(findOneUser) {
                                return exits.error({
                                    data: findOneUser,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneUser) {
                                // Delete session key
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].del({
                                    "key": "me"
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(deleteSessionKey) {
                                        return exits.error({
                                            data: deleteSessionKey,
                                            status: 500
                                        });

                                    },
                                    "success": function(deleteSessionKey) {
                                        return exits.respond({
                                            data: "/signup",
                                            action: "redirect",
                                            status: 200
                                        });

                                    }
                                });

                            }
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