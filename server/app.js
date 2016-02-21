'use strict';

const koa = require('koa');

const serve = require('koa-static');
const logger = require('koa-logger');
const Router = require('koa-router');

const config = require('./config');

const Path = require('path');
const Forecast = require('forecast.io-bluebird');
let forecast = new Forecast({
    key: config.forecastio.apiKey,
    timeout: 2500
});

const app = koa();

app.use(function * (next) {
    try {
        yield next;
    }
    catch (err) {
        this.status = err.status || 500;
        
        if (this.status === 500) {
            console.error(err.stack);
        }
        
        this.body = { error: this.status === 500 ? 'Internal server error' : err.message };
    }
});

app.use(logger());

app.use(
    serve(
        Path.join(__dirname, '..', 'static'),
        {
            gzip: false
        }
    )
);

const router = new Router();

router.get('/user', function * () {
    this.body = config.user;
});

router.get('/weather', function * () {
     let result = yield forecast.fetch(config.forecastio.location.lat, config.forecastio.location.lng);
     this.body = result;
});

app.use(router.routes());

app.listen(8080);
console.log('app started');