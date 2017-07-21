// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router','ngCordova'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('temp', {
				cache:false,
				url: '/temp',
				templateUrl: 'templates/temp.html',
			})

			.state('menu', {
				url: '/menu',
				cache:false,
				abstract: true,
				templateUrl: 'templates/menu.html',
				// controller: 'AppCtrl'
			})

			.state('menu.fact', {
				cache:false,
				url: '/fact',
				views: {
					'menuContent': {
						templateUrl: 'templates/fact.html'
					}
				}

			})

			.state('menu.video', {
				cache: false,
				url: '/video',
				views: {
					'menuContent': {
						templateUrl: 'templates/video.html'
					}
				}

			})

			.state('menu.trending', {
				cache: false,
				url: '/trending',
				views: {
					'menuContent': {
						templateUrl: 'templates/trending.html'
					}
				}

			})

			.state('menu.quote', {
				cache:false,
				url: '/quote',
				views: {
					'menuContent': {
						templateUrl: 'templates/quote.html'
					}
				}

			})

			.state('menu.onthisday', {
				cache: false,
				url: '/onthisday',
				views: {
					'menuContent': {
						templateUrl: 'templates/onthisday.html'
					}
				}

			});




		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/temp');
	})


	.run(function ($ionicPlatform, $ionicPopup) {
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
			ionic.Platform.fullScreen();
			if (window.StatusBar) {
				return StatusBar.hide();
			}
		});

		$ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
	})
	.controller("cardCtrl", cardCtrl)
	.controller("videoCtrl", videoCtrl)
	.controller("trendingCtrl", trendingCtrl)
	.controller("quoteCtrl", quoteCtrl)
	.controller("otdCtrl", otdCtrl)
	.controller("tempCtrl",tempCtrl)
	.controller("menuCtrl",menuCtrl)
	.factory("tempService",tempService)

	function tempService(){
		return {'id':1,'array':[]};
	}

	function menuCtrl(tempService){
		var menu=this;
		menu.id=tempService.id;
		console.log(menu.id);
	}
	function tempCtrl(tempService,$state,$http){
		var temp=this;
		temp.id=tempService.id;
		switch(tempService.id){
			case 1:
					temp.name="Quote";
					tempService.array=[];
					var Url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
					var promise = $http.get(Url).then(function (result) {
						console.log(result);
						tempService.array[0]=result.data;
						setTimeout(function(){$state.go("menu.quote");},1000);

					}).catch(function (err) {
						console.log(err);
						setTimeout(function(){$state.go("menu.quote");},1000);
					});
					break;
			case 2:
					temp.name="Fact";
					tempService.array=[];
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
							tempService.array.push({ "factNo": factNo, "fact": result.data });
							if(i==5){
								console.log("working");
								setTimeout(function(){$state.go("menu.fact");},1000);
							}
								


						}).catch(function (err) {
							console.log(err);
							setTimeout(function(){$state.go("menu.fact");},1000);
						});
					}
					
					break;
			case 3:
					temp.name="Video";
					tempService.array=[];
					var channels = ["asapscience", "life+noggin", "veritasium", "vsauce", "scishow", "dnews", "kurzgesagt", "bbc+earth+lab", "CrashCourse", "teded", "bostondynamics", "MinutePhysics", "brainstuff", "minuteEarth", "smarterEveryday", "Reallifelore", "numberphile", "It's+okay+to+be+smart"];
						for (i = 0; i < 5; i++) {
							var ranChannel = Math.round(Math.random() * (channels.length - 1));
							var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + channels[ranChannel] + "&maxResults=30&type=video&key=AIzaSyDPqcGVIpZg4wSEWqWYbDMc31buy7oDLo4"
							var promise = $http.get(youtubeUrl).then(function (result) {
								var ranVideo = Math.round(Math.random() * 29);
								console.log(result);
								v = result.data.items[ranVideo];
								vPart = {}
								vPart.title = v.snippet.title;
								vPart.id = v.id.videoId;
								vPart.thumbnail = v.snippet.thumbnails.high.url;
								tempService.array.push(vPart);
								if(i==5)
									setTimeout(function(){$state.go("menu.video");},1000);

							}).catch(function (err) {
								console.log(err);
							});

						}
					
					break;
			case 4:
					temp.name="Trending"
					tempService.array=[];
					var sources = ["abc-news-au", "al-jazeera-english", "ars-technica", "bbc-news", "bloomberg", "business-insider", "cnn", "daily-mail", "engadget", "espn", "hacker-news", "mashable", "metro", "mirror", "national-geographic", "polygon", "recode", "reuters", "techcrunch", "techradar", "the-economist", "the-hindu", "the-huffington-post", "the-new-york-times", "the-next-web", "the-times-of-india", "the-verge", "time"]
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
							tempService.array.push(n);
							if(i==5)
							setTimeout(function(){$state.go("menu.trending");},1000);

						}).catch(function (err) {
							console.log(err);
						});

					}
					
					break;
			
			case 5:
					temp.name="On This Day";
					tempService.array=[];
					var Url = "http://history.muffinlabs.com/date";
					var promise = $http.get(Url).then(function (result) {
						console.log(result);
						tempService.array = result.data.data.Events;
						tempService.array.reverse();
						setTimeout(function(){$state.go("menu.onthisday");},1000);

					}).catch(function (err) {
						console.log(err);
						setTimeout(function(){$state.go("menu.onthisday");},1000);
						
					});
					
					break;


					

					




		}
	}

function otdCtrl($state, $http,tempService) {
	var otd = this;
	otd.animate=false;
	// var Url = "http://history.muffinlabs.com/date";
	// var promise = $http.get(Url).then(function (result) {
	// 	console.log(result);
	// 	otd.otds = result.data.data.Events;
	// 	otd.otds.reverse();

	// }).catch(function (err) {
	// 	console.log(err);
	// });
	otd.otds=tempService.array;

	otd.down = function () {
		tempService.id=4;
		otd.animate=true;
		setTimeout(function(){$state.go("temp");},350);
	}
}

function quoteCtrl($state, $http,tempService) {
	var quote = this;
	quote.animate=false;


	// var Url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
	// var promise = $http.get(Url).then(function (result) {
	// 	console.log(result);
	// 	quote.quotes = result.data;

	// }).catch(function (err) {
	// 	console.log(err);
	// });
	quote.quotes=tempService.array[0];



	quote.up = function () {
		quote.animate=true;
		tempService.id=2;
		setTimeout(function(){$state.go("temp");},350);
		
		// quote.animate=false;
	}
}

function trendingCtrl($state, $http, $scope, $ionicSlideBoxDelegate,tempService) {
	var trending = this;
	trending.animateUp=false;
	trending.animateDown=false;
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


	// for (i = 0; i < 5; i++) {
	// 	var ranSource = Math.round(Math.random() * (sources.length - 1));
	// 	var Url = "https://newsapi.org/v1/articles?source=" + sources[ranSource] + "&apiKey=abe02c4e4c284cd6abe5897f5082c6ae";
	// 	var promise = $http.get(Url).then(function (result) {

	// 		news = result.data.articles;
	// 		var ranNews = Math.round(Math.random() * (news.length - 1));
	// 		n = {};
	// 		n.title = news[ranNews].title;
	// 		n.description = news[ranNews].description;
	// 		n.urlToImage = news[ranNews].urlToImage;
	// 		n.url = news[ranNews].url;
	// 		trending.news.push(n);

	// 	}).catch(function (err) {
	// 		console.log(err);
	// 	});

	// }
	trending.news=tempService.array;

	trending.down = function () {
		tempService.id=3;
		trending.animateDown=true;
		setTimeout(function(){$state.go("temp");},350);
	}
	trending.up = function () {
		tempService.id=5;
		trending.animateUp=true;
		setTimeout(function(){$state.go("temp");},350);
	}
}

function videoCtrl($state, $http, $scope, $ionicSlideBoxDelegate,tempService) {
	var video = this;
	video.animateUp=false;
	video.animateDown=false;
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

	// for (i = 0; i < 5; i++) {
	// 	var ranChannel = Math.round(Math.random() * (channels.length - 1));
	// 	var youtubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + channels[ranChannel] + "&maxResults=30&type=video&key=AIzaSyDPqcGVIpZg4wSEWqWYbDMc31buy7oDLo4"
	// 	var promise = $http.get(youtubeUrl).then(function (result) {
	// 		var ranVideo = Math.round(Math.random() * 29);
	// 		console.log(result);
	// 		v = result.data.items[ranVideo];
	// 		vPart = {}
	// 		vPart.title = v.snippet.title;
	// 		vPart.id = v.id.videoId;
	// 		vPart.thumbnail = v.snippet.thumbnails.high.url;
	// 		video.videos.push(vPart);

	// 	}).catch(function (err) {
	// 		console.log(err);
	// 	});

	// }
	video.videos=tempService.array;


	video.down = function () {
		tempService.id=2;
		video.animateDown=true;
		setTimeout(function(){$state.go("temp");},350);
	}
	video.up = function () {
		tempService.id=4;
		video.animateUp=true;
		setTimeout(function(){$state.go("temp");},350);
	}
}


function cardCtrl($http, $state, $ionicSlideBoxDelegate, $scope,tempService) {
	var card = this;
	card.animateUp=false;
	card.animateDown=false;
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




	// for (i = 0; i < 5; i++) {
	// 	var baseUrl = "http://numbersapi.com/random/trivia"

	// 	var promise = $http.get(baseUrl);
	// 	promise.then(function (result) {
	// 		console.log(result);
	// 		factNo = "";
	// 		for (j = 0; j < result.data.length; j++) {
	// 			if (result.data[j] == " ") {
	// 				factNo = result.data.substr(0, j);
	// 				break;
	// 			}

	// 		}
	// 		factNo = "https://dummyimage.com/800x480/000/fff.jpg&text=" + factNo;
	// 		card.cards.push({ "factNo": factNo, "fact": result.data });

	// 		var keywordUrl = "http://api.cortical.io:80/rest/text/keywords?retina_name=en_associative"

	// 		var keypromise = $http.post(keywordUrl, result.data, { headers: { "api-key": "438da670-6646-11e7-b22d-93a4ae922ff1" } });
	// 		keypromise.then(function (result1) {
	// 			console.log(result1);
	// 		}).catch(function (err) {
	// 			console.log(err);
	// 			console.log("error");
	// 		});

	// 	}).catch(function (err) {
	// 		console.log(err);
	// 	});
	// }

	card.cards=tempService.array;

	card.up = function () {
		tempService.id=3;
		card.animateUp=true;
		setTimeout(function(){$state.go("temp");},350);
	}
	card.down = function () {
		tempService.id=1;
		card.animateDown=true;
		setTimeout(function(){$state.go("temp");},350);
	}

	// card.menu=function(){
	//   $state.go("menu");
	// }

	console.log(card.cards);

}
