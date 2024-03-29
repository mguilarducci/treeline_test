var Machine = require("machine");
module.exports = {
    $id_subtract: function(req, res) {
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
                            data: "/signup",
                            action: "redirect",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // Find One Stock
                        sails.machines['_project_3032_0.0.4'].findOne_stock({
                            "criteria": {
                                uniqueString: inputs.id
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneStock) {
                                // Subtract (-)
                                sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_4.4.0'].subtract({
                                    "a": (findOneStock && findOneStock.count),
                                    "b": 1
                                }).exec({
                                    "error": function(subtract) {
                                        return exits.error({
                                            data: subtract,
                                            status: 500
                                        });

                                    },
                                    "success": function(subtract) {
                                        // If less than (<)
                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.3.0'].ifLessThan({
                                            "a": subtract,
                                            "b": 1
                                        }).exec({
                                            "error": function(ifLessThan) {
                                                return exits.error({
                                                    data: ifLessThan,
                                                    status: 500
                                                });

                                            },
                                            "otherwise": function(ifLessThan) {
                                                // Update Stock
                                                sails.machines['_project_3032_0.0.4'].update_stock({
                                                    "count": subtract,
                                                    "criteria": {
                                                        uniqueString: inputs.id
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(updateStock) {
                                                        return exits.respond({
                                                            data: updateStock,
                                                            action: "respond_with_result_and_status",
                                                            status: 200
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
                                            "success": function(ifLessThan) {
                                                // Destroy Stock
                                                sails.machines['_project_3032_0.0.4'].destroy_stock({
                                                    "criteria": {
                                                        uniqueString: inputs.id
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(destroyStock) {
                                                        return exits.respond({
                                                            data: destroyStock,
                                                            action: "respond_with_result_and_status",
                                                            status: "204"
                                                        });

                                                    },
                                                    "error": function(destroyStock) {
                                                        return exits.error({
                                                            data: destroyStock,
                                                            status: 500
                                                        });

                                                    }
                                                });

                                            }
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
    $id_add: function(req, res) {
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
                            data: "/signup",
                            action: "redirect",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // Find One Stock
                        sails.machines['_project_3032_0.0.4'].findOne_stock({
                            "criteria": {
                                uniqueString: inputs.id
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneStock) {
                                // Add (+1)
                                sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_4.4.0'].add({
                                    "a": 1,
                                    "b": (findOneStock && findOneStock.count)
                                }).exec({
                                    "error": function(add1) {
                                        return exits.error({
                                            data: add1,
                                            status: 500
                                        });

                                    },
                                    "success": function(add1) {
                                        // Update Stock
                                        sails.machines['_project_3032_0.0.4'].update_stock({
                                            "count": add1,
                                            "criteria": {
                                                uniqueString: inputs.id
                                            }
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(updateStock) {
                                                return exits.respond({
                                                    data: updateStock,
                                                    action: "respond_with_result_and_status",
                                                    status: 200
                                                });

                                            },
                                            "error": function(updateStock) {
                                                return exits.error({
                                                    data: updateStock,
                                                    status: 500
                                                });

                                            }
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
                                return exits.respond({
                                    action: "respond_with_status",
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
                            data: "/signup",
                            action: "redirect",
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // List Stock
                        sails.machines['_project_3032_0.0.4'].find_stock({
                            "criteria": {
                                userId: (req.session.me ? (req.session.me + '') : ''),
                                count: {
                                    ">": 0
                                }
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listStock) {
                                // Sort
                                sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_4.4.0'].sort({
                                    "collection": listStock,
                                    "key": "expirationDate"
                                }).exec({
                                    "error": function(sort) {
                                        return exits.error({
                                            data: sort,
                                            status: 500
                                        });

                                    },
                                    "success": function(sort) {
                                        return exits.respond({
                                            data: sort,
                                            action: "respond_with_result_and_status",
                                            status: 200
                                        });

                                    }
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
    post_create: function(req, res) {
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
                        sails.machines['_project_3032_0.0.4'].findOne_stock({
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
                                sails.machines['_project_3032_0.0.4'].update_stock({
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
                                sails.machines['_project_3032_0.0.4'].findOne_beer({
                                    "criteria": {
                                        uniqueString: inputs.beerId
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneBeer) {
                                        // Generate unique token
                                        sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_4.4.0'].generateUniqueToken({}).exec({
                                            "error": function(generateUniqueToken) {
                                                return exits.error({
                                                    data: generateUniqueToken,
                                                    status: 500
                                                });

                                            },
                                            "success": function(generateUniqueToken) {
                                                // Create Stock
                                                sails.machines['_project_3032_0.0.4'].create_stock({
                                                    "userId": (req.session.me ? (req.session.me + '') : ''),
                                                    "beerId": inputs.beerId,
                                                    "expirationDate": inputs.expirationDate,
                                                    "beerName": (findOneBeer && findOneBeer.name),
                                                    "count": inputs.count,
                                                    "uniqueString": generateUniqueToken
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
    }
};