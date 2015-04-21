var Machine = require("machine");
module.exports = {
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "name": {
                    "example": "abc123",
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
                        return exits.respond({
                            data: "/signup",
                            action: "redirect",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // Find One Beer
                        sails.machines['_project_3032_0.0.4'].findOne_beer({
                            "criteria": {
                                name: inputs.name
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneBeer) {
                                return exits.respond({
                                    data: findOneBeer,
                                    action: "respond_with_result_and_status",
                                    status: "409"
                                });

                            },
                            "error": function(findOneBeer) {
                                return exits.error({
                                    data: findOneBeer,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneBeer) {
                                // Generate unique token
                                sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_4.4.0'].generateUniqueToken({}).exec({
                                    "error": function(generateUniqueToken) {
                                        return exits.error({
                                            data: generateUniqueToken,
                                            status: 500
                                        });

                                    },
                                    "success": function(generateUniqueToken) {
                                        // Create Beer
                                        sails.machines['_project_3032_0.0.4'].create_beer({
                                            "createdBy": (req.session.me ? (req.session.me + '') : ''),
                                            "name": inputs.name,
                                            "uniqueString": generateUniqueToken
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createBeer) {
                                                return exits.respond({
                                                    data: createBeer,
                                                    action: "respond_with_result_and_status",
                                                    status: "201"
                                                });

                                            },
                                            "error": function(createBeer) {
                                                return exits.error({
                                                    data: createBeer,
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
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    $id: function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
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
                        return exits.respond({
                            action: "respond_with_status",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // Find One Beer
                        sails.machines['_project_3032_0.0.4'].findOne_beer({
                            "criteria": {
                                uniqueString: inputs.id
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneBeer) {
                                return exits.respond({
                                    data: findOneBeer,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(findOneBeer) {
                                return exits.error({
                                    data: findOneBeer,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneBeer) {
                                return exits.respond({
                                    action: "respond_with_status",
                                    status: "400"
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
    },
    get_find: function(req, res) {
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
                            data: "/",
                            action: "redirect",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // List Beer
                        sails.machines['_project_3032_0.0.4'].find_beer({}).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listBeer) {
                                return exits.respond({
                                    data: listBeer,
                                    action: "respond_with_result_and_status",
                                    status: 200,
                                    view: "beers"
                                });

                            },
                            "error": function(listBeer) {
                                return exits.error({
                                    data: listBeer,
                                    status: 500
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