"use strict";

/**
 * Will do a 301 redirect if the AWS load balancer adds a x-forwarded-proto to the request headers
 * options: object
 * options.stripWWW: boolean
 */

module.exports = function({ stripWWW = false, addWWW = false }) {
  function transformHostname({ hostname }) {
    if (stripWWW && hostname.match(/^www\./)) {
      return hostname.replace(/^www\./, "");
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
