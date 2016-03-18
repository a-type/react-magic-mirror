'use strict';
import React, { Component } from 'react';
import Greeting from './Greeting';
import Weather from './Weather';
const request = require('browser-request');
const moment = require('moment');

const weatherUpdateInterval = 60 * 60 * 1000;

const getTime = () => {
    return moment().format('h:mm a');
}

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: { name: '' },
            forecast: null,
            time: getTime()
        };
    }

    fetchWeather () {
        let self = this;

        request.get('/weather', (er, response) => {
            self.setState({
                forecast: JSON.parse(response.body)
            });
        });
    }

    fetchUser () {
        let self = this;

        request.get('/user', (er, response) => {
            self.setState({
                user: JSON.parse(response.body)
            });
        });
    }

    componentDidMount () {
        this.fetchUser();

        let self = this;

        (function updateTime() {
            self.setState({ time: getTime() });

            setTimeout(updateTime, 60 * 1000);
        })();

        (function updateWeather() {
            self.fetchWeather();

            setTimeout(updateWeather, weatherUpdateInterval);
        })();
    }

    render () {
        let className = 'home';

        return (
            <div className={className}>
                <div className='info'>
                    <Greeting user={this.state.user}/>
                    <Weather forecast={this.state.forecast}/>
                </div>
            </div>
        );
    }
}