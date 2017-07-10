// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
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


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller("cardCtrl",cardCtrl)
.controller("videoCtrl", videoCtrl)
.controller("trendingCtrl", trendingCtrl)
.controller("quoteCtrl",quoteCtrl)
.controller("otdCtrl", otdCtrl)

function otdCtrl($state) {
  var otd = this;
  otd.otds=[];
  day={};
  day.thumbnail="cube.jpg"
  day.description="1967 - Biafran War erupts as Nigerian forces invade starting Nigerian Civil war"
  otd.otds.push(day);

  day={};
  day.thumbnail="tree.jpg"
  day.description="1459 - Sun City India founded by Rao Jodhpur"
  otd.otds.push(day);

  otd.down=function(){
    $state.go("menu.trending");
  }
}

function quoteCtrl($state) {
  var quote = this;
  quote.quotes=[];
  q={};
  q.thumbnail="rain.jpeg"
  q.description="\"Don't cry because it's over, smile because it happened.\" \n ― Dr. Seuss"
  quote.quotes.push(q);

  q={};
  q.thumbnail="cloud.jpg"
  q.description="\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\" \n ― Albert Einstein"
  quote.quotes.push(q);

  quote.up=function(){
    $state.go("menu.fact");
  }
}

function trendingCtrl($state) {
  var trending = this;
  trending.news=[];
  trend={};
  trend.thumbnail="water.jpeg"
  trend.description="News content 1"
  trending.news.push(trend);

  trend={};
  trend.thumbnail="balloon.jpeg"
  trend.description="News content 2"
  trending.news.push(trend);

  trending.down=function(){
    $state.go("menu.video");
  }
  trending.up=function(){
    $state.go("menu.onthisday");
  }
}

function videoCtrl($state) {
  var video = this;
  video.videos=[];
  vid={};
  vid.thumbnail="travel.jpg"
  vid.description="Description of the video 1"
  video.videos.push(vid);

  vid={};
  vid.thumbnail="wind.jpg"
  vid.description="Description of the video 2"
  video.videos.push(vid);

  video.down=function(){
    $state.go("menu.fact");
  }
  video.up=function(){
    $state.go("menu.trending");
  }
}


function cardCtrl($state) {
  var card=this;

  card.cards=[];

  fact={};
  fact.image="flower.jpg";
  fact.content="In the United States, the term pig refers to a younger domesticated swine weighing less than 120 pounds (50 kilograms), and the term hog refers to older swine weighing more than 120 lbs. In Great Britain all domesticated swine are referred to as pigs.";
  card.cards.push(fact);

  fact={};
  fact.image="building.jpg";
  fact.content="A puppy usually goes into a new home at seven to nine weeks of age. She is ready to transfer to her human pack at this age. If you are adopting an older puppy (over 12 weeks) and she has had limited socialization, you may have to work harder at first.";
  card.cards.push(fact);

  fact={};
  fact.image="wind.jpg";
  fact.content="Pasty gray. Originally, Stan Lee and Jack Kirby intended the Hulk to be gray. But the printing press kept having trouble with the Hulk's color and he kept coming out green. So he only spent the first few issues of his comic being gray.";
  card.cards.push(fact);

  fact={};
  fact.image="hand.jpg";
  fact.content="They took their name off the dubious list of teams that had never won the big game with their 43-8 thrashing of Denver. Four franchises - the Cleveland Browns, Detroit Lions, Houston Texans and Jacksonville Jaguars - have never even been to the Super Bowl.";
  card.cards.push(fact);

  fact={};
  fact.image="travel.jpg";
  fact.content="The Nike clothing brand is named after the Greek goddess of victory. The winged goddess Nike sat at the side of Zeus. Her presence symbolized victory, and she was said to have presided over some of history's earliest battles.";
  card.cards.push(fact);

  card.up=function(){
    $state.go("menu.video");
  }
  card.down=function(){
    $state.go("menu.quote");
  }

  // card.menu=function(){
  //   $state.go("menu");
  // }

  console.log(card.cards);

}
