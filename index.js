"use strict";

/**
 * Will do a 301 redirect if the AWS load balancer adds a x-forwarded-proto to the request headers
 * options: object
 * options.stripWWW: boolean
 */

module.exports = function({ stripWWW = false, enforceHostname = "" } = {}) {
  function transformHostname(req) {
    let hostname = req.hostname || "";
    if (stripWWW && hostname.match(/^www\./)) {
      hostname = hostname.replace(/^www\./, "");
    }

    if (enforceHostname && hostname !== enforceHostname) {
      hostname = enforceHostname;
    }

    return hostname;
  }

  return function forceHttps(req, res, next) {
    const xfp =
      req.headers["X-Forwarded-Proto"] || req.headers["x-forwarded-proto"];
    const hostname = transformHostname(req);
    if (xfp === "http" || hostname !== req.hostname) {
      res.redirect(301, `https://${hostname}${req.url}`);
    } else {
      next();
    }
  };
};
