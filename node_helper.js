const exec = require("child_process").exec;
var fs = require('fs');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    console.log("Downloading hours");

    if(notification === "BRING_HOURS"){
      var hours = fs.readFileSync('DATA.txt', 'utf8');
      self.sendSocketNotification("HOURS", hours);
    }
  },

});
