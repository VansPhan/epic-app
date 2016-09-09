"use strict";

(function() {
  angular
    .module('epic', [
        "ui.router",
        "story",
        "home",
        "ngAnimate"
    ])
    .config([
        "$stateProvider",
        RouterFunction
    ])
    .controller('MainController', function(HomeFactory, $scope) {
    	  $scope.epics = HomeFactory.query();
    	  $scope.open = function() {
        this.epicList = !this.epicList;
        if (this.epicList == true) {
          document.getElementById("epic-list").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
        }
        else {
          document.getElementById("epic-list").style.width = "0";
          document.getElementById("main").style.marginLeft= "0";
        }
      }
    })

  	function RouterFunction($stateProvider) {
  		$stateProvider
  		.state("epicIndex", {
	      url: "/",
	      templateUrl: "assets/home/index.html",
	      controller: "HomeIndexController",
	      controllerAs: "HomeIndexCtrl"
   	})
		.state("epicShow", {
			url: "/epics/:id",
			templateUrl: "assets/home/show.html",
			controller: "HomeShowController",
			controllerAs: "HomeShowCtrl"
		})
    .state("otherwise", {
      url : "*path",
      templateUrl: "assets/home/index.html",
      controller: "HomeIndexController",
      controllerAs: "HomeIndexCtrl"
    });
  	}
}())
