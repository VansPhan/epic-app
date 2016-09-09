"use strict";

(function() {
   angular
      .module("home")
      .factory("HomeFactory", [
         "$resource",
         HomeFactoryFunction
      ]);

      function HomeFactoryFunction($resource) {
         return $resource("https://epic-db.herokuapp.com/epics/:id", {}, {
         update: { method: "PUT" }
      });
   }
}());
