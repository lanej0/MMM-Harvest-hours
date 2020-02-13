var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    console.log("Downloading hours");

    if(notification === "BRING_HOURS"){
      var hours = "9.0";
      self.sendSocketNotification("HOURS", hours);
    }
  },

});
