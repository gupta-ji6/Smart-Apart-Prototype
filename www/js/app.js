// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('menu', {
    url: '/menu',
    // abstract: true,
    templateUrl: 'templates/menu.html',
    // controller: 'AppCtrl'
  })

  .state('fact', {
    url: '/fact',
    // abstract: true,
    templateUrl: 'templates/fact.html',
    
  })

  .state('video', {
    url: '/video',
    // abstract: true,
    templateUrl: 'templates/video.html',
    
  });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/fact');
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
.controller("paneCtrl",paneCtrl)
.controller("videoCtrl", videoCtrl)

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
    $state.go("fact");
  }
}

function paneCtrl() {
  var pane=this;
  pane.header="Fact";
  pane.control=1;
  pane.change=function(){
    pane.header="Videos";
    pane.control=2;
  }

  pane.revChange=function(){
    pane.header="Fact";
    pane.control=1;
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
    $state.go("video");
  }

  card.menu=function(){
    $state.go("menu");
  }

  console.log(card.cards);

}
