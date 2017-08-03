// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router', 'ngCordova'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('intro', {
				cache: false,
				url: '/intro',
				templateUrl: 'templates/intro.html',
			})

			.state('temp', {
				cache: false,
				url: '/temp',
				templateUrl: 'templates/temp.html',
			})

			.state('menu', {
				url: '/menu',
				cache: false,
				abstract: true,
				templateUrl: 'templates/menu.html',
				// controller: 'AppCtrl'
			})

			.state('menu.fact', {
				cache: false,
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
				cache: false,
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

			})

			.state('menu.about', {
				cache: false,
				url: '/about',
				views: {
					'menuContent': {
						templateUrl: 'templates/about.html'
					}
				}

			});




		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/intro');
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

		$ionicPlatform.registerBackButtonAction(function (event) {
			if (true) {
				$ionicPopup.confirm({
					title: 'Exit',
					template: 'Are you sure you want to exit?',
					cancelText: 'Make me smarter!',
					cancelType: 'button-positive',
					okText: 'Exit',
					okType: 'button-light'
				}).then(function (res) {
					if (res) {
						ionic.Platform.exitApp();
					}
					else {
						$ionicHistory.goBack();
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
	.controller("tempCtrl", tempCtrl)
	.controller("menuCtrl", menuCtrl)
	.controller("introCtrl", introCtrl)
	.factory("tempService", tempService)

function tempService() {
	return { 'id': 1, 'array': [], 'bookmark': false };
}

function introCtrl($state) {
	var intro = this;
	localforage.getItem("intro", function (err, data) {
		if (data == null) {
			localforage.setItem("intro", { 'visited': true });
		}
		else {
			// $state.go("temp")
		}
	});
	intro.continue = function () {
		$state.go("temp");
	}
}


function menuCtrl(tempService, $state) {
	var menu = this;
	menu.id = tempService.id;
	console.log(menu.id);

	menu.isCategoriesActive = false;
	menu.isBookmarksActive = false;
	menu.items = ["Quote", "Fact", "Videos", "Trending", "On This Day"];
	menu.about = function () {
		$state.go("menu.about");
	}
	menu.change = function (item) {
		if (item == "Quote") {
			tempService.id = 1;
			tempService.bookmark = false;
			$state.go("temp");
		}
		else
			if (item == "Fact") {
				tempService.id = 2;
				tempService.bookmark = false;
				$state.go("temp");
			}
			else
				if (item == "Videos") {
					tempService.id = 3;
					tempService.bookmark = false;
					$state.go("temp");
				}
				else
					if (item == "Trending") {
						tempService.id = 4;
						tempService.bookmark = false;
						$state.go("temp");
					}
					else
						if (item == "On This Day") {
							tempService.id = 5;
							tempService.bookmark = false;
							$state.go("temp");
						}
	}
	menu.changeBookmark = function (item) {
		if (item == "Quote") {
			tempService.id = 1;
			tempService.bookmark = true;
			$state.go("temp");
		}
		else
			if (item == "Fact") {
				tempService.id = 2;
				tempService.bookmark = true;
				$state.go("temp");
			}
			else
				if (item == "Videos") {
					tempService.id = 3;
					tempService.bookmark = true;
					$state.go("temp");
				}
				else
					if (item == "Trending") {
						tempService.id = 4;
						tempService.bookmark = true;
						$state.go("temp");
					}
					else
						if (item == "On This Day") {
							tempService.id = 5;
							tempService.bookmark = true;
							$state.go("temp");
						}
	}

	menu.toggleCategory = function () {
		menu.isCategoriesActive = !menu.isCategoriesActive;
	};
	menu.toggleBookmark = function () {
		menu.isBookmarksActive = !menu.isBookmarksActive;
	};

}
function tempCtrl(tempService, $state, $http, $scope, $cordovaLocalNotification, $ionicPlatform) {
	// $ionicPlatform.ready(function () {

	// 	localforage.getItem("notification",function(err,data){
	// 		if(data==null){
	// 			var date = new Date();
	// 			date.setDate(date.getDate()+1);
	// 			date.setHours(7);
	// 			date.setMinutes(30);
	// 			date.setSeconds(0);
	// 			var date2 = new Date();
	// 			date2.setDate(date2.getDate()+1);
	// 			date2.setHours(21);
	// 			date2.setMinutes(0);
	// 			date2.setSeconds(0);
	// 			$cordovaLocalNotification.schedule({
	// 				id: 1,
	// 				title: 'Its time to get smart!',
	// 				text: 'Begin your day by gaining some knowledge. Tap to open Smart Apart ',
	// 				firstAt: date,
	// 				every: 'day'
	// 			}).then(function (result) {
	// 				console.log('Notification 1 triggered');
	// 			});
	// 			$cordovaLocalNotification.schedule({
	// 			id: 2,
	// 			title: 'Its time to get smart!',
	// 			text: 'Lets gain some knowledge before going to sleep. Tap to open Smart Apart ',
	// 			firstAt: date2,
	// 			every: 'day'
	// 			}).then(function (result) {
	// 			console.log('Notification 2 triggered');
	// 			});
	// 			localforage.setItem("notification",{set:true});
	// 		}
	// 	});

	// });
	var temp = this;
	temp.id = tempService.id;
	switch (tempService.id) {
		case 1:
			temp.name = "Quote";
			tempService.array = [];
			var Url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en";
			if (!tempService.bookmark) {
				var promise = $http.get(Url).then(function (result) {
					console.log(result);
					tempService.array.push(result.data);
					setTimeout(function () { $state.go("menu.quote"); }, 1000);

				}).catch(function (err) {
					console.log(err);
					$state.go("menu.quote");

				});
			} else {
				localforage.getItem("quote", function (err, data) {
					tempService.array = data;
					tempService.array.reverse();
					setTimeout(function () { $state.go("menu.quote"); }, 1000);
				});
			}
			break;
		case 2:
			temp.name = "Fact";
			tempService.array = [];
			if (!tempService.bookmark) {
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
						if (i == 5) {
							console.log("working");
							setTimeout(function () { $state.go("menu.fact"); }, 1000);
						}



					}).catch(function (err) {
						console.log(err);
						setTimeout(function () { $state.go("menu.fact"); }, 1000);
					});
				}
			} else {
				localforage.getItem("fact", function (err, data) {
					tempService.array = data;
					tempService.array.reverse();
					setTimeout(function () { $state.go("menu.fact"); }, 1000);
				});
			}
			break;
		case 3:
			temp.name = "Video";
			tempService.array = [];
			var channels = ["asapscience", "life+noggin", "veritasium", "vsauce", "scishow", "dnews", "kurzgesagt", "bbc+earth+lab", "CrashCourse", "teded", "bostondynamics", "MinutePhysics", "brainstuff", "minuteEarth", "smarterEveryday", "Reallifelore", "numberphile", "It's+okay+to+be+smart"];
			if (!tempService.bookmark) {
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
						if (i == 5)
							setTimeout(function () { $state.go("menu.video"); }, 1000);

					}).catch(function (err) {
						console.log(err);
					});

				}
			}
			else {
				localforage.getItem("video", function (err, data) {
					tempService.array = data.reverse();
					setTimeout(function () { $state.go("menu.video"); }, 1000);
				});
			}

			break;
		case 4:
			temp.name = "Trending"
			tempService.array = [];
			var sources = ["al-jazeera-english", "ars-technica", "bbc-news", "bloomberg", "business-insider", "cnn", "daily-mail", "engadget", "espn", "hacker-news", "mashable", "metro", "mirror", "national-geographic", "polygon", "recode", "reuters", "techcrunch", "techradar", "the-economist", "the-hindu", "the-huffington-post", "the-new-york-times", "the-next-web", "the-times-of-india", "the-verge", "time"]
			if (!tempService.bookmark) {
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
						if (i == 5)
							setTimeout(function () { $state.go("menu.trending"); }, 1000);

					}).catch(function (err) {
						console.log(err);
					});

				}
			} else {
				localforage.getItem("trending", function (err, data) {
					console.log(data);
					tempService.array = data;
					tempService.array.reverse();
					setTimeout(function () { $state.go("menu.trending"); }, 1000);
				});
			}

			break;

		case 5:
			temp.name = "On This Day";
			tempService.array = [];
			var Url = "http://history.muffinlabs.com/date";
			if (!tempService.bookmark) {
				var promise = $http.get(Url).then(function (result) {
					console.log(result);
					var dat = result.data.date;
					for (i = 0; i < result.data.data.Events.length; i++) {
						obj = {};
						obj.date = dat;
						obj.text = result.data.data.Events[i].text;
						obj.year = result.data.data.Events[i].year;
						tempService.array.push(obj);

					}
					tempService.array.reverse();
					setTimeout(function () { $state.go("menu.onthisday"); }, 1000);

				}).catch(function (err) {
					console.log(err);
					setTimeout(function () { $state.go("menu.onthisday"); }, 1000);

				});
			}
			else {
				localforage.getItem("otd", function (err, data) {
					console.log(data);
					tempService.array = data;
					tempService.array.reverse();
					setTimeout(function () { $state.go("menu.onthisday"); }, 1000);
				});
			}
			break;









	}
}


function otdCtrl($state, $http, $scope, $ionicSlideBoxDelegate, tempService, $cordovaSocialSharing) {
	var otd = this;
	otd.animate = false;
	otd.animateBookmark = false;
	otd.slide = 0;
	otd.b = tempService.bookmark;
	otd.favorite = "";
	if (otd.b) {
		otd.favorite = "Bookmarked";
	}
	otd.otds = tempService.array;
	console.log(otd.otds);
	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		otd.slide = data.slider.activeIndex;

	});

	otd.down = function () {
		if (!tempService.bookmark) {
			tempService.id = 4;
			otd.animate = true;
			setTimeout(function () { $state.go("temp"); }, 350);

		}
	}

	otd.bookmark = function () {
		localforage.getItem("otd", function (err, data) {
			console.log(data);
			if (data == null) {
				data = [];
				data.push(otd.otds[otd.slide]);
				localforage.setItem("otd", data);
			}
			else {
				for (i = 0; i < data.length; i++) {
					if (data[i].text == otd.otds[otd.slide].text) {
						break;
					}
				}
				if (i == data.length) {
					data.push(otd.otds[otd.slide]);
				}

				localforage.setItem("otd", data);
			}
		});
		otd.animateBookmark = true;
		setTimeout(function () {
			otd.animateBookmark = false;
		}, 1500)
	}

	otd.share = function () {
		$cordovaSocialSharing
			.share("I just found from Smart Apart app that on "+ otd.otds[otd.slide].date +" in "+ otd.otds[otd.slide].year + "\n" + otd.otds[otd.slide].text + "\n\n Smarten up yourself the clever way. Download Now!") // Share via native share sheet
			.then(function (result) {
				console.log("success");
			}, function (err) {
				// An error occured. Show a message to the user
			});
	}
}


function quoteCtrl($state, $http, $scope, $ionicSlideBoxDelegate, tempService, $cordovaSocialSharing) {
	var quote = this;
	quote.b = tempService.bookmark;
	quote.favorite = "";
	quote.animateBookmark = false;
	if (quote.b) {
		quote.favorite = "Bookmarked";
	}
	quote.animate = false;
	quote.slide = 0;
	quote.quotes = tempService.array;
	// console.log(quote.quotes.length);

	// else{
	// 	quote.quotes = tempService.array[0];
	// }
	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		quote.slide = data.slider.activeIndex;
	});

	quote.up = function () {
		if (!tempService.bookmark) {
			quote.animate = true;
			tempService.id = 2;
			setTimeout(function () { $state.go("temp"); }, 350);

		}
	}
	quote.bookmark = function () {
		localforage.getItem("quote", function (err, data) {
			console.log(data);
			if (data == null) {
				data = [];
				data.push(quote.quotes[0]);
				localforage.setItem("quote", data);
			}
			else {
				for (i = 0; i < data.length; i++) {
					if (quote.quotes[0].quoteText == data[i].quoteText)
						break;
				}
				if (i == data.length) {
					data.push(quote.quotes[0]);
				}

				localforage.setItem("quote", data);


			}
		
		});
			quote.animateBookmark = true;
			setTimeout(function () {
				quote.animateBookmark = false;
			}, 1500);
}
	
	quote.share = function () {
		$cordovaSocialSharing
			.share("\"" + quote.quotes[quote.slide].quoteText + "\"" + "\n- " + quote.quotes[quote.slide].quoteAuthor + "\n\n I found out this quote on Smart Apart app. Smarten up yourself the clever way. Download Now! ") // Share via native share sheet
			.then(function (result) {
				console.log("success");
			}, function (err) {
				// An error occured. Show a message to the user
			});
	}
}

function trendingCtrl($state, $http, $scope, $ionicSlideBoxDelegate, tempService, $cordovaSocialSharing, $cordovaInAppBrowser, $ionicPlatform) {
	var trending = this;
	trending.animateUp = false;
	trending.animateDown = false;
	trending.animateBookmark = false;
	trending.b = tempService.bookmark;
	trending.favorite = "";
	if (trending.b) {
		trending.favorite = "Bookmarked";
	}

	trending.news = [];
	max = 0;
	trending.slide = 0;
	var sources = ["al-jazeera-english", "ars-technica", "bbc-news", "bloomberg", "business-insider", "cnn", "daily-mail", "engadget", "espn", "hacker-news", "mashable", "metro", "mirror", "national-geographic", "polygon", "recode", "reuters", "techcrunch", "techradar", "the-economist", "the-hindu", "the-huffington-post", "the-new-york-times", "the-next-web", "the-times-of-india", "the-verge", "time"]

	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		trending.slide = data.slider.activeIndex;

		if (!tempService.bookmark && data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {
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
	console.log(tempService.array);
	trending.news = tempService.array;

	trending.down = function () {
		if (!tempService.bookmark) {
			tempService.id = 3;
			trending.animateDown = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}
	trending.up = function () {
		if (!tempService.bookmark) {
			tempService.id = 5;
			trending.animateUp = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}

	trending.bookmark = function () {
		localforage.getItem("trending", function (err, data) {
			console.log(data);
			if (data == null) {
				data = [];
				data.push(trending.news[trending.slide]);
				localforage.setItem("trending", data);
			}
			else {
				for (i = 0; i < data.length; i++) {
					if (trending.news[trending.slide].title == data[i].title)
						break;
				}
				if (i == data.length)
					data.push(trending.news[trending.slide]);
				localforage.setItem("trending", data);
			}
		});
		trending.animateBookmark = true;
		setTimeout(function () {
			trending.animateBookmark = false;
		}, 1500);

	}

	trending.share = function () {

		$cordovaSocialSharing
			.share("I just found out - \n\n" + trending.news[trending.slide].title + " - \n\n" + trending.news[trending.slide].description +"\nRead more - "+trending.news[trending.slide].url+ "\n\nGet more latest news from Smart Apart app. Smarten up yourself the clever way. Download Now!") // Share via native share sheet
			.then(function (result) {
				console.log("success");
			}, function (err) {
				// An error occured. Show a message to the user
			});

	}
	trending.browser = function (url) {
		var options = {
			location: 'yes',
			clearcache: 'yes',
			toolbar: 'no'
		};
		$ionicPlatform.ready(function () {
			$cordovaInAppBrowser.open(url, '_blank', options)
				.then(function (event) {
					// success
				})
				.catch(function (event) {
					// error
				});

		});
	}
}

function videoCtrl($state, $http, $scope, $ionicSlideBoxDelegate, tempService, $cordovaSocialSharing) {
	var video = this;
	video.animateUp = false;
	video.animateDown = false;
	video.animateBookmark = false;

	video.b = tempService.bookmark;
	video.favorite = "";
	if (video.b) {
		video.favorite = "Bookmarked";
	}

	var channels = ["asapscience", "life+noggin", "veritasium", "vsauce", "scishow", "dnews", "kurzgesagt", "bbc+earth+lab", "CrashCourse", "teded", "bostondynamics", "MinutePhysics", "brainstuff", "minuteEarth", "smarterEveryday", "Reallifelore", "numberphile", "It's+okay+to+be+smart"];
	video.videos = [];
	video.slide = 0;
	max = 0;

	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		video.slide = data.slider.activeIndex;

		if (!tempService.bookmark && data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {
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
	video.videos = tempService.array;


	video.down = function () {
		if (!tempService.bookmark) {
			tempService.id = 2;
			video.animateDown = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}
	video.up = function () {
		if (!tempService.bookmark) {
			tempService.id = 4;
			video.animateUp = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}

	video.bookmark = function () {
		localforage.getItem("video", function (err, data) {
			console.log(data);
			if (data == null) {
				data = [];
				data.push(video.videos[video.slide]);
				localforage.setItem("video", data);
			}
			else {
				for (i = 0; i < data.length; i++) {
					if (data[i].id == video.videos[video.slide].id)
						break;
				}
				if (i == data.length)
					data.push(video.videos[video.slide]);
				localforage.setItem("video", data);
			}
		});
		video.animateBookmark = true;
		setTimeout(function () {
			video.animateBookmark = false;
		}, 1500);

	}

	video.share = function () {
		$cordovaSocialSharing
			.share("I just found out this amazing video on Smart Apart app.\n\n" + video.videos[video.slide].title + " - \n\n" + "https://www.youtube.com/watch?v=" + video.videos[video.slide].id + "\n\nWatch more informational videos on Smart Apart app. Smarten up yourself the clever way. Download Now! ") // Share via native share sheet
			.then(function (result) {
				console.log("success");
			}, function (err) {
				// An error occured. Show a message to the user
			});
	}
}


function cardCtrl($http, $state, $ionicSlideBoxDelegate, $scope, tempService, $cordovaSocialSharing) {
	var card = this;

	card.b = tempService.bookmark;
	card.animateBookmark = false;
	card.favorite = "";
	if (card.b) {
		card.favorite = "Bookmarked";
	}

	card.animateUp = false;
	card.animateDown = false;
	card.cards = [];
	card.slide = 0;
	max = 0;
	$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
		console.log('Slide change is beginning', data.slider.activeIndex);
		card.slide = data.slider.activeIndex;
		if (!tempService.bookmark && data.slider.activeIndex > max && data.slider.activeIndex % 4 == 0) {

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

	card.cards = tempService.array;

	card.up = function () {
		if (!tempService.bookmark) {
			tempService.id = 3;
			card.animateUp = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}
	card.down = function () {
		if (!tempService.bookmark) {
			tempService.id = 1;
			card.animateDown = true;
			setTimeout(function () { $state.go("temp"); }, 350);
		}
	}

	card.bookmark = function () {
		localforage.getItem("fact", function (err, data) {
			console.log(data);
			if (data == null) {
				data = [];
				data.push(card.cards[card.slide]);
				localforage.setItem("fact", data);
			}
			else {
				for (i = 0; i < data.length; i++) {
					if (data[i].fact == card.cards[card.slide].fact)
						break;
				}
				if (i == data.length)
					data.push(card.cards[card.slide]);
				localforage.setItem("fact", data);
			}
		});
		card.animateBookmark = true;
		setTimeout(function () {
			card.animateBookmark = false;
		}, 1500);

	}
	card.share = function () {
		$cordovaSocialSharing
			.share("Did you know that - \n" + card.cards[card.slide].fact + ".\nI found out this mind boggling fact on Smart Apart app. Smarten up yourself the clever way. Download Now!") // Share via native share sheet
			.then(function (result) {
				console.log("success");
			}, function (err) {
				// An error occured. Show a message to the user
			});


	}

	// card.menu=function(){
	//   $state.go("menu");
	// }

	console.log(card.cards);

}
