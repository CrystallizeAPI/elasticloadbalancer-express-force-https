/**
 * Will do a 301 redirect if the AWS load balancer adds a x-forwarded-proto to the request headers
 */
function forceHttps(req, res, next) {
  const xfp =
    req.headers["X-Forwarded-Proto"] || req.headers["x-forwarded-proto"];
  if (xfp === "http") {
    const secureUrl = `https://${req.headers.host}${req.url}`;
    res.redirect(301, secureUrl);
    res.end();
    return;
  }
  next();
}
