var Machine = require("machine");
module.exports = {
    create: function(req, res) {
        Machine.build({
            inputs: {
                "email": {
                    "example": "abc123",
                    "required": true
                },
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                }
            },
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
                        // Find One User
                        sails.machines['_project_3032_0.0.1'].findOne_user({
                            "criteria": {
                                email: inputs.email
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                // Check password
                                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].checkPassword({
                                    "passwordAttempt": inputs.password,
                                    "encryptedPassword": (findOneUser && findOneUser.password)
                                }).exec({
                                    "error": function(checkPassword) {
                                        return exits.error({
                                            data: checkPassword,
                                            status: 500
                                        });

                                    },
                                    "incorrect": function(checkPassword) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: "400"
                                        });

                                    },
                                    "success": function(checkPassword) {
                                        // Log in
                                        sails.machines['63fcae7b-edc4-4591-85b7-ba4863aa367e_0.2.3'].login({
                                            "id": (findOneUser && findOneUser.id)
                                        }).setEnvironment({
                                            req: req
                                        }).exec({
                                            "error": function(logIn) {
                                                return exits.error({
                                                    data: logIn,
                                                    status: 500
                                                });

                                            },
                                            "success": function(logIn) {
                                                return exits.respond({
                                                    action: "respond_with_status",
                                                    status: 200
                                                });

                                            }
                                        });

                                    }
                                });

                            },
                            "error": function(findOneUser) {
                                return exits.error({
                                    data: findOneUser,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneUser) {
                                return exits.respond({
                                    action: "respond_with_status",
                                    status: "400"
                                });

                            }
                        });

                    },
                    "success": function(checkLoginStatus) {
                        return exits.respond({
                            action: "respond_with_status",
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