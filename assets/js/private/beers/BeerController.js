angular.module('BeerModule').controller('BeerController', 
	['$scope', '$http', '$routeParams', '$filter', 'toastr', 
	function($scope, $http, $routeParams, $filter, toastr){

	// set-up loading state
	$scope.beerForm = {
		loading: false
	};

	$scope.submit = function() {

		// Set the loading state (i.e. show loading spinner)
		$scope.beerForm.loading = true;

		// Submit request to Sails.
		$http.post('/beers', {
			name: $scope.beerForm.name
		})
		.then(function onSuccess(sailsResponse) {
			window.location = '#/beers/' + sailsResponse.data.uniqueString;
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
		$http.post('/stock', {
			beerId: $scope.beer.uniqueString,
			count: $scope.beerForm.count,
			expirationDate: $filter('date')($scope.beerForm.expirationDate, 'yyyy-MM-dd')

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
		var url = '/beers/' + $routeParams.id;
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
		$http.get('/beers')
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
		$http.get('/stock')
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

	$scope.stockAdd = function(index) {
		var url = '/stock/' + $scope.beers[index].uniqueString + '/add'; 
		updateStock(index, url);
	};

	$scope.stockSubtract = function(index) {
		var url = '/stock/' + $scope.beers[index].uniqueString + '/subtract'; 
		updateStock(index, url);
	};

	var updateStock = function(index, url) {
		$http.put(url)
			.then(function onSuccess(sailsResponse) {
				if(sailsResponse.status === 204) {
					$scope.beers[index].count = 0;
				} else {
					$scope.beers[index] = sailsResponse.data[0];
				}
			})
			.catch(function onError(sailsResponse) {
				if (sailsResponse.status !== 200) {
					toastr.error('Please try again.', 'Error');
					return;
				}
			})
			.finally(function eitherWay(){
			});
	};


}]);