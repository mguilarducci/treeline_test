module.exports.routes = {
  "get /api/stock": "ApiController.get_stock",
  "post /signup": "SignupController.post_create",
  "post /api/stock": "ApiController.post_stock",
  "post /api/beers": "ApiController.post_beers",
  "get /": "Home$Controller.find",
  "post /login": "LoginController.create",
  "get /logout": "LogoutController.find",
  "get /api/beers": "ApiController.get_beers",
  "get /signup": "SignupController.get_find",
  "get /api/beers/:id": "ApiController.beers_$id"
};