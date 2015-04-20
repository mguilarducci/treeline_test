module.exports.routes = {
  "post /api/stock": "ApiController.post_stock",
  "post /api/beers": "ApiController.post_beers",
  "get /api/stock": "ApiController.get_stock",
  "get /": "Home$Controller.find",
  "post /login": "LoginController.create",
  "get /logout": "LogoutController.find",
  "get /api/beers": "ApiController.get_beers",
  "post /signup": "SignupController.post_create",
  "get /signup": "SignupController.get_find",
  "get /api/beers/:id": "ApiController.beers_$id"
};