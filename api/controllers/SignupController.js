var Machine = require("machine");
module.exports = {
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "email": {
                    "example": "abc123",
                    "required": true
                },
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "name": {
                    "example": "scott",
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
                        sails.machines['_project_3032_0.0.0'].findOne_user({
                            "criteria": {
                                email: inputs.email
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                return exits.respond({
                                    data: findOneUser,
                                    action: "respond_with_result_and_status",
                                    status: "409"
                                });

                            },
                            "error": function(findOneUser) {
                                return exits.error({
                                    data: findOneUser,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneUser) {
                                // Encrypt password
                                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].encryptPassword({
                                    "password": inputs.password
                                }).exec({
                                    "error": function(encryptPassword) {
                                        return exits.error({
                                            data: encryptPassword,
                                            status: 500
                                        });

                                    },
                                    "success": function(encryptPassword) {
                                        // Get image URL
                                        sails.machines['af6a106f-a2cc-4170-a08a-86f2f5eabc38_1.1.4'].getImageUrl({
                                            "emailAddress": inputs.email
                                        }).exec({
                                            "error": function(getImageURL) {
                                                return exits.error({
                                                    data: getImageURL,
                                                    status: 500
                                                });

                                            },
                                            "encodingFailed": function(getImageURL) {
                                                return exits.respond({
                                                    action: "respond_with_status",
                                                    status: 500
                                                });

                                            },
                                            "success": function(getImageURL) {
                                                // Create User
                                                sails.machines['_project_3032_0.0.0'].create_user({
                                                    "email": inputs.email,
                                                    "name": inputs.name,
                                                    "password": encryptPassword,
                                                    "gravatarUrl": getImageURL
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(createUser) {
                                                        return exits.respond({
                                                            data: createUser,
                                                            action: "respond_with_result_and_status",
                                                            status: 200
                                                        });

                                                    },
                                                    "error": function(createUser) {
                                                        return exits.error({
                                                            data: createUser,
                                                            status: 500
                                                        });

                                                    }
                                                });

                                            }
                                        });

                                    }
                                });

                            }
                        });

                    },
                    "success": function(checkLoginStatus) {
                        return exits.respond({
                            data: checkLoginStatus,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    get_find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "signup",
                    data: undefined
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};