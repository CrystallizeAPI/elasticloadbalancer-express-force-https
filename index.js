"use strict";

/**
 * Will do a 301 redirect if the AWS load balancer adds a x-forwarded-proto to the request headers
 * options: object
 * options.stripWWW: boolean
 */

module.exports = function({ stripWWW = false, addWWW = false }) {
  function transformHost({ host }) {
    if (stripWWW && host.match(/^www\./)) {
      return host.replace(/^www\./, "");
    }
    return false;
  }

  return function forceHttps(req, res, next) {
    const xfp =
      req.headers["X-Forwarded-Proto"] || req.headers["x-forwarded-proto"];
    const host = transformHost(req);
    if (xfp === "http" || host !== req.host) {
      res.redirect(301, `https://${host}${req.url}`);
    } else {
      next();
    }
  };
};
