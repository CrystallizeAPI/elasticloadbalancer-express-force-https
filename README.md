![alt text](https://raw.githubusercontent.com/CrystallizeAPI/elasticloadbalancer-express-force-https/HEAD/media/logo.png "Abstract node with arms")

# HTTPS redirect for an Express webserver running behind a Elastic Load Balancer

This package makes it easy to force HTTPS using Express. Since [HTTPS is faster than HTTP](https://snowball.digital/blog/https-is-faster-than-http). The package is generic but was built for the [Crystallize React Commerce boilerplate](https://crystallize.com/developers).

## Install

```
yarn add @crystallize/elasticloadbalancer-express-force-https
```

## Usage

```
const express = require('express');
const forceHttps = require('@crystallize/elasticloadbalancer-express-force-https');

const server = express();
server.use(forceHttps());
```

## Options

Pass an optional options object if needed

### stripWWW (boolean)

Optional

Strip the leading www. from the host for both https and http requests

### redirectHostnames (object(from (string), to (string)))

Optional

Redirect to a given hostname. Example from old-site.com to new-site.com:

```
redirectHostnames: {
    'old-site.com': 'new-site.com'
}
```
