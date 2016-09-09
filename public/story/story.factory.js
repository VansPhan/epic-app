"use strict";

(function() {
   angular
      .module("story")
      .factory("StoryFactory", [
         "$resource",
         StoryFactoryFunction
      ]);

      function StoryFactoryFunction($resource) {
         return $resource("https://epic-db.herokuapp.com/stories/:id", {}, {
         update: { method: "PUT" }
      });
   }
}());
