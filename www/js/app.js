// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('menu', {
				url: '/menu',
				abstract: true,
				templateUrl: 'templates/menu.html',
				// controller: 'AppCtrl'
			})

			.state('menu.fact', {
				url: '/fact',
				views: {
					'menuContent': {
						templateUrl: 'templates/fact.html'
					}
				}

			})

			.state('menu.video', {
				url: '/video',
				views: {
					'menuContent': {
						templateUrl: 'templates/video.html'
					}
				}

			})

			.state('menu.trending', {
				url: '/trending',
				views: {
					'menuContent': {
						templateUrl: 'templates/trending.html'
					}
				}

			})

			.state('menu.quote', {
				url: '/quote',
				views: {
					'menuContent': {
						templateUrl: 'templates/quote.html'
					}
				}

			})

			.state('menu.onthisday', {
				url: '/onthisday',
				views: {
					'menuContent': {
						templateUrl: 'templates/onthisday.html'
					}
				}

			});




		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/menu/quote');
	})


	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.controller("cardCtrl", cardCtrl)
	.controller("videoCtrl", videoCtrl)
	.controller("trendingCtrl", trendingCtrl)
	.controller("quoteCtrl", quoteCtrl)
	.controller("otdCtrl", otdCtrl)

function otdCtrl($state, $http) {
	var otd = this;
	var Url = "http://history.muffinlabs.com/date";
	var promise = $http.get(Url).then(function (result) {
		console.log(result);
		otd.otds = result.data.data.Events;
		otd.otds.reverse();

	}).catch(function (err) {
		console.log(err);
	});

	otd.down = function () {
		$state.go("menu.trending");
	}
}

function quoteCtrl($state, $http) {
	var quote = this;


	var Url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
	var promise = $http.get(Url).then(function (result) {
		console.log(result);
		quote.quotes = result.data;

	}).catch(function (err) {
		console.log(err);
	});



	quote.up = function () {
		$state.go("menu.fact");
	}
}

function trendingCtrl($state, $http, $scope, $ionicSlideBoxDelegate) {
	var trending = this;
	trending.news = [];
	max = 0;
	var sources = ["abc-news-au", "al-jazeera-english", "ars-technica", "bbc-news", "bloomberg", "business-insider", "cnn", "daily-mail", "engadget", "espn", "hacker-news", "mashable", "metro", "mirror", "national-geographic", "polygon", "recode", "reuters", "techcrunch", "techradar", "the-economist", "the-hindu", "the-huffington-post", "the-new-york-times", "the-next-web", "the-times-of-india", "the-verge", "time"]

	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		if (data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {
			if (max < data.slider.activeIndex) {
				max = data.slider.activeIndex;
			}
			for (i = 0; i < 5; i++) {
				var ranSource = Math.round(Math.random() * (sources.length - 1));
				var Url = "https://newsapi.org/v1/articles?source=" + sources[ranSource] + "&apiKey=abe02c4e4c284cd6abe5897f5082c6ae";
				var promise = $http.get(Url).then(function (result) {

					news = result.data.articles;
					var ranNews = Math.round(Math.random() * (news.length - 1));
					n = {};
					n.title = news[ranNews].title;
					n.description = news[ranNews].description;
					n.urlToImage = news[ranNews].urlToImage;
					n.url = news[ranNews].url;
					trending.news.push(n);

				}).catch(function (err) {
					console.log(err);
				});

			}
		}

	});


	for (i = 0; i < 5; i++) {
		var ranSource = Math.round(Math.random() * (sources.length - 1));
		var Url = "https://newsapi.org/v1/articles?source=" + sources[ranSource] + "&apiKey=abe02c4e4c284cd6abe5897f5082c6ae";
		var promise = $http.get(Url).then(function (result) {

			news = result.data.articles;
			var ranNews = Math.round(Math.random() * (news.length - 1));
			n = {};
			n.title = news[ranNews].title;
			n.description = news[ranNews].description;
			n.urlToImage = news[ranNews].urlToImage;
			n.url = news[ranNews].url;
			trending.news.push(n);

		}).catch(function (err) {
			console.log(err);
		});

	}

	trending.down = function () {
		$state.go("menu.video");
	}
	trending.up = function () {
		$state.go("menu.onthisday");
	}
}

function videoCtrl($state, $http, $scope, $ionicSlideBoxDelegate) {
	var video = this;
	var channels = ["asapscience", "life+noggin", "veritasium", "vsauce", "scishow", "dnews", "kurzgesagt", "bbc+earth+lab", "CrashCourse", "teded", "bostondynamics", "MinutePhysics", "brainstuff", "minuteEarth", "smarterEveryday", "Reallifelore", "numberphile", "It's+okay+to+be+smart"];
	video.videos = [];
	max = 0;

	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		if (data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {
			if (max < data.slider.activeIndex) {
				max = data.slider.activeIndex;
			}
			for (i = 0; i < 5; i++) {
				var ranChannel = Math.round(Math.random() * (channels.length - 1));
				var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + channels[ranChannel] + "&maxResults=30&type=video&key=AIzaSyDPqcGVIpZg4wSEWqWYbDMc31buy7oDLo4"
				var promise = $http.get(youtubeUrl).then(function (result) {
					console.log(result);
					var ranVideo = Math.round(Math.random() * 29);
					v = result.data.items[ranVideo];
					vPart = {}
					vPart.title = v.snippet.title;
					vPart.id = v.id.videoId;
					vPart.thumbnail = v.snippet.thumbnails.high.url;
					video.videos.push(vPart);

				}).catch(function (err) {
					console.log(err);
				});

			}

		}

	});

	for (i = 0; i < 5; i++) {
		var ranChannel = Math.round(Math.random() * (channels.length - 1));
		var ranVideo = Math.round(Math.random() * 29);
		var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + channels[ranChannel] + "&maxResults=30&type=video&key=AIzaSyDPqcGVIpZg4wSEWqWYbDMc31buy7oDLo4"
		var promise = $http.get(youtubeUrl).then(function (result) {
			console.log(result);
			v = result.data.items[ranVideo];
			vPart = {}
			vPart.title = v.snippet.title;
			vPart.id = v.id.videoId;
			vPart.thumbnail = v.snippet.thumbnails.high.url;
			video.videos.push(vPart);

		}).catch(function (err) {
			console.log(err);
		});

	}


	video.down = function () {
		$state.go("menu.fact");
	}
	video.up = function () {
		$state.go("menu.trending");
	}
}


function cardCtrl($http, $state, $ionicSlideBoxDelegate, $scope) {
	var card = this;
	card.cards = [];
	max = 0;
	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		if (data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {

			if (max < data.slider.activeIndex) {
				max = data.slider.activeIndex;
			}

			for (i = 0; i < 5; i++) {
				var baseUrl = "http://numbersapi.com/random/trivia"

				var promise = $http.get(baseUrl);
				promise.then(function (result) {
					console.log(result);
					factNo = "";
					for (j = 0; j < result.data.length; j++) {
						if (result.data[j] == " ") {
							factNo = result.data.substr(0, j);
							break;
						}

					}
					factNo = "https://dummyimage.com/800x480/000/fff.jpg&text=" + factNo;
					card.cards.push({ "factNo": factNo, "fact": result.data });



				}).catch(function (err) {
					console.log(err);
				});
			}

		}

	});




	for (i = 0; i < 5; i++) {
		var baseUrl = "http://numbersapi.com/random/trivia"

		var promise = $http.get(baseUrl);
		promise.then(function (result) {
			console.log(result);
			factNo = "";
			for (j = 0; j < result.data.length; j++) {
				if (result.data[j] == " ") {
					factNo = result.data.substr(0, j);
					break;
				}

			}
			factNo = "https://dummyimage.com/800x480/000/fff.jpg&text=" + factNo;
			card.cards.push({ "factNo": factNo, "fact": result.data });

			var keywordUrl = "http://api.cortical.io:80/rest/text/keywords?retina_name=en_associative"

			var keypromise = $http.post(keywordUrl, result.data, { headers: { "api-key": "438da670-6646-11e7-b22d-93a4ae922ff1" } });
			keypromise.then(function (result1) {
				console.log(result1);
				console.log("hello");

			}).catch(function (err) {
				console.log(err);
				console.log("error");
			});

		}).catch(function (err) {
			console.log(err);
		});
	}



	card.up = function () {
		$state.go("menu.video");
	}
	card.down = function () {
		$state.go("menu.quote");
	}

	// card.menu=function(){
	//   $state.go("menu");
	// }

	console.log(card.cards);

}
