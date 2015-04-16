var Machine = require("machine");
module.exports = {
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
                        sails.machines['_project_3032_0.0.0'].find_beer({
                            "criteria": {
                                userId: (req.session.me ? (req.session.me + '') : '')
                            }
                        }).setEnvironment({
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
    },
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "name": {
                    "example": "scott",
                    "required": true
                },
                "expirationDate": {
                    "example": "scott",
                    "required": true
                },
                "tried": {
                    "example": true,
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
                        // Create Beer
                        sails.machines['_project_3032_0.0.0'].create_beer({
                            "name": inputs.name,
                            "userId": (req.session.me ? (req.session.me + '') : ''),
                            "expirationDate": inputs.expirationDate,
                            "tried": inputs.tried
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(createBeer) {
                                return exits.respond({
                                    data: "/beers",
                                    action: "redirect",
                                    status: 200
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
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};