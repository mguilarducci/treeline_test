module.exports.routes = {
  "get /signup": "SignupController.get_find",
  "post /signup": "SignupController.post_create",
  "get /stock": "StockController.get_find",
  "post /beers": "BeersController.post_create",
  "post /stock": "StockController.post_create",
  "get /logout": "LogoutController.find",
  "post /login": "LoginController.create",
  "get /beers": "BeersController.get_find",
  "get /": "Home$Controller.find",
  "put /stock/:id/subtract": "StockController.$id_subtract",
  "put /stock/:id/add": "StockController.$id_add",
  "get /beers/:id": "BeersController.$id"
};