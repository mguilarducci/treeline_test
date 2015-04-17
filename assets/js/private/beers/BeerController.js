angular.module('BeerModule').controller('BeerController', ['$scope', '$http', '$routeParams', 'toastr', function($scope, $http, $routeParams, toastr){

	// set-up loading state
	$scope.beerForm = {
		loading: false
	};

	$scope.submit = function() {

		// Set the loading state (i.e. show loading spinner)
		$scope.beerForm.loading = true;

		// Submit request to Sails.
		$http.post('/api/beers', {
			name: $scope.beerForm.name
		})
		.then(function onSuccess(sailsResponse) {
			window.location = '#/beers';
		})
		.catch(function onError(sailsResponse) {

			// Handle known error type(s).
			// If using sails-disk adpater -- Handle Duplicate Key
			var beerExists = sailsResponse.status == 409;

			if (beerExists) {
				toastr.error('That beer name has already been taken, please try again.', 'Error');
				return;
			}

		})
		.finally(function eitherWay() {
			$scope.beerForm.loading = false;
		});
	};

	$scope.submitStock = function() {

		// Set the loading state (i.e. show loading spinner)
		$scope.beerForm.loading = true;

		// Submit request to Sails.
		$http.post('/api/stock', {
			beerId: $scope.beer.id,
			count: $scope.beerForm.count,
			expirationDate: $scope.beerForm.expirationDate

		})
		.then(function onSuccess(sailsResponse) {
			window.location = '#/stock';
		})
		.catch(function onError(sailsResponse) {
			if (sailsResponse.status == 400) {
				toastr.error('Wrong values, please try again.', 'Error');
				return;
			}

		})
		.finally(function eitherWay() {
			$scope.beerForm.loading = false;
		});
	};

	$scope.findOne = function () {
		$scope.beerForm.loading = true;
		var url = '/api/beers/' + $routeParams.id;
		$http.get(url)
			.then(function onSuccess(sailsResponse) {
				$scope.beer = sailsResponse.data;
			})
			.catch(function onError(sailsResponse) {
				if (sailsResponse.status !== 200) {
					toastr.error('Please try again.', 'Error');
					return;
				}
			})
			.finally(function eitherWay(){
				$scope.beerForm.loading = false;
			});

    };

	$scope.find = function() {
		$scope.beerForm.loading = true;
		$http.get('/api/beers')
			.then(function onSuccess(sailsResponse) {
				$scope.beers = sailsResponse.data;
			})
			.catch(function onError(sailsResponse) {
				if (sailsResponse.status !== 200) {
					toastr.error('Please try again.', 'Error');
					return;
				}
			})
			.finally(function eitherWay(){
				$scope.beerForm.loading = false;
			});
	};

	$scope.findStock = function() {
		$scope.beerForm.loading = true;
		$http.get('/api/stock')
			.then(function onSuccess(sailsResponse) {
				$scope.beers = sailsResponse.data;
			})
			.catch(function onError(sailsResponse) {
				if (sailsResponse.status !== 200) {
					toastr.error('Please try again.', 'Error');
					return;
				}
			})
			.finally(function eitherWay(){
				$scope.beerForm.loading = false;
			});
	};


}]);