(function(window) {
    window["env"] = window["env"] || {};
    const DOMAIN_PORT = "localhost:8080"
    // Environment variables
    window["env"]["apiUrl"] = "http://" + DOMAIN_PORT + "/api";
    window["env"]["apiWs"] = "http://" + DOMAIN_PORT;
  })(this);