module.exports.routes = {
  "get /logout": "LogoutController.find",
  "get /api/stock": "ApiController.get_stock",
  "post /api/beers": "ApiController.post_beers",
  "post /api/stock": "ApiController.post_stock",
  "get /api/beers": "ApiController.get_beers",
  "get /": "Home$Controller.find",
  "post /signup": "SignupController.post_create",
  "post /login": "LoginController.create",
  "get /signup": "SignupController.get_find",
  "get /api/beers/:id": "ApiController.beers_$id"
};