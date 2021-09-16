"use strict";

define(function (require) {
   const placeholderManager = require("core/placeholderManager");
   
   require('modules/orderbook/orders/components/order-address/order-address.component');
   require('modules/orderbook/orders/components/dropdown-selector/dropdown-selector.component');
   
   const ngComponent = require("core/ngComponent");
   const template = require("text!./order-address.component.html");
   const angular = require('angular');
   
   console.log('outside.');   
   this.onInit = () => {
      console.log('onInit outside.');   
      alert('onInit outside.');   
      debugger;	
   };
   
  
   $(document).load(function ($scope) {
      console.log("Load...");
   });
   
   
   // ====
   
   $(document).ready(function ($scope) {
      
    console.log('Here!');
    const config = { childList: true, subtree: true };

    function searchTree(element, matchingTitle) {
      if (element.querySelectorAll("navigation right padding-left-none")) {
        console.log("Founded buttons");
        return element.querySelectorAll("button")[0];
      }

      
      else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
          result = searchTree(element.children[i], matchingTitle);
        }
        return result;
      }
      return null;
    }

    var callback = function (mutationsList, observer) {
       console.log('callback!');
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            var result = searchTree(node, "external-ui-component");
            if (result) {
              console.log("Founded needed !!! heeey :) ");
              console.log(result);
            
              return;
            }
          }
        }
      }
    };

    console.log('observer');
      
    const observer = new MutationObserver(callback);

    const session = JSON.parse(window.localStorage.getItem('SPA_auth_session'));

    setTimeout(function () {
      const targetNode = document.getElementsByClassName("opened-modules")[0];
      observer.observe(targetNode, config);
    }, 2000);
  });
   
   
});
