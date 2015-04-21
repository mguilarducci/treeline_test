module.exports.routes = {
  "post /signup": "SignupController.post_create",
  "get /stock": "StockController.get_find",
  "post /beers": "BeersController.post_create",
  "post /stock": "StockController.post_create",
  "get /": "Home$Controller.find",
  "get /beers": "BeersController.get_find",
  "post /login": "LoginController.create",
  "get /logout": "LogoutController.find",
  "get /signup": "SignupController.get_find",
  "get /beers/:id": "BeersController.$id"
};