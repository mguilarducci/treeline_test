module.exports.routes = {
  "get /": "Home$Controller.find",
  "post /login": "LoginController.create",
  "get /beers": "BeersController.get_find",
  "post /beers": "BeersController.post_create",
  "post /signup": "SignupController.post_create",
  "get /signup": "SignupController.get_find"
};