var Machine = require("machine");
module.exports = {
    get_stock: function(req, res) {
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
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // List Stock
                        sails.machines['_project_3032_0.0.1'].find_stock({
                            "criteria": {
                                userId: (req.session.me ? (req.session.me + '') : '')
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listStock) {
                                return exits.respond({
                                    data: listStock,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(listStock) {
                                return exits.error({
                                    data: listStock,
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
    },
    beers_$id: function(req, res) {
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
                        sails.machines['_project_3032_0.0.1'].findOne_beer({
                            "criteria": {
                                id: inputs.id
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
    post_beers: function(req, res) {
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
                        sails.machines['_project_3032_0.0.1'].findOne_beer({
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
                                // Create Beer
                                sails.machines['_project_3032_0.0.1'].create_beer({
                                    "name": inputs.name,
                                    "createdBy": (req.session.me ? (req.session.me + '') : '')
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
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    post_stock: function(req, res) {
        Machine.build({
            inputs: {
                "beerId": {
                    "example": "abc123",
                    "required": true
                },
                "expirationDate": {
                    "example": "scott",
                    "required": true
                },
                "count": {
                    "example": 123,
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
                        // Find One Stock
                        sails.machines['_project_3032_0.0.1'].findOne_stock({
                            "criteria": {
                                userId: (req.session.me ? (req.session.me + '') : ''),
                                beerId: inputs.beerId,
                                expirationDate: inputs.expirationDate
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneStock) {
                                // Update Stock
                                sails.machines['_project_3032_0.0.1'].update_stock({
                                    "count": inputs.count,
                                    "criteria": {
                                        id: (findOneStock && findOneStock.id)
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(updateStock) {
                                        return exits.respond({
                                            data: updateStock,
                                            action: "respond_with_result_and_status",
                                            status: "200"
                                        });

                                    },
                                    "error": function(updateStock) {
                                        return exits.error({
                                            data: updateStock,
                                            status: 500
                                        });

                                    }
                                });

                            },
                            "error": function(findOneStock) {
                                return exits.error({
                                    data: findOneStock,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneStock) {
                                // Find One Beer
                                sails.machines['_project_3032_0.0.1'].findOne_beer({
                                    "criteria": {
                                        id: inputs.beerId
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneBeer) {
                                        // Create Stock
                                        sails.machines['_project_3032_0.0.1'].create_stock({
                                            "userId": (req.session.me ? (req.session.me + '') : ''),
                                            "beerId": (findOneBeer && findOneBeer.id),
                                            "expirationDate": inputs.expirationDate,
                                            "beerName": (findOneBeer && findOneBeer.name),
                                            "count": inputs.count
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createStock) {
                                                return exits.respond({
                                                    data: createStock,
                                                    action: "respond_with_result_and_status",
                                                    status: "201"
                                                });

                                            },
                                            "error": function(createStock) {
                                                return exits.error({
                                                    data: createStock,
                                                    status: 500
                                                });

                                            }
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    get_beers: function(req, res) {
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
                        sails.machines['_project_3032_0.0.1'].find_beer({}).setEnvironment({
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