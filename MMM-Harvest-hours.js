Module.register("MMM-Harvest-hours", {
  defaults: {
    updateInterval: 600 * 1000, // every 5 minutes
    initialLoadDelay: 1,
    retryDelay: 2500,
    height: 150,
    width: 300
  },

  getStyles: function () {
    return ["MMM-Harvest-hours.css"];
  },
  getScripts: function () {
    return ["moment.js"];
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.width = this.config.width + "px";
    wrapper.style.height = this.config.height + "px";
    wrapper.style.overflow = "hidden";
    wrapper.style.position = "relative";

    var h3 = document.createElement("h3");
    h3.innerHTML = "Hours today: " + this.hours;
    wrapper.appendChild(h3);
    return wrapper;
  },

  start: function() {
    Log.info("Starting module: " + this.name);

    this.loaded = false;
    this.scheduleUpdate(this.config.initialLoadDelay);
    this.updateTimer = null;
  },

  updateHours: function() {
    var self = this;
    self.sendSocketNotification("BRING_HOURS");
  },

  socketNotificationReceived: function(notification, payload) {
    if(notification === "HOURS"){
      this.hours=payload
      if (typeof this.hours !== "undefined") {
        this.loaded=true;
        this.updateDom();
      };
      this.scheduleUpdate();
    }
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function() {
      self.updateHours();
    }, nextLoad);
  },

});
