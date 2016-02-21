'use strict';
import React, { Component } from 'react';
import Greeting from './Greeting';
import Weather from './Weather';
const request = require('browser-request');
const moment = require('moment');

const numBackgrounds = 20;

const getTime = () => {
    return moment().format('h:mm a');
}

const getRandomBackground = () => {
    const idx = Math.floor(Math.random() * numBackgrounds);
    return `url(/img/idle/${idx}.jpg)`;
}

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: { name: '' },
            forecast: null,
            idle: true,
            time: getTime(),
            idleBackground: getRandomBackground()
        };
    }
    
    update () {
        let self = this;
        
        request.get('/user', (er, response) => {
            self.setState({
                user: JSON.parse(response.body)
            });
        });
        
        request.get('/weather', (er, response) => {
            self.setState({
                forecast: JSON.parse(response.body)
            });
        });
    }
    
    goIdle () {
        this.setState({
            idleBackground: getRandomBackground(),
            idle: true
        });
    }
    
    componentDidMount () {
        this.update();
        
        let self = this;
        
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyA' || e.char === 'a' || e.key === 'a') {
                self.setState({ idle: false });
                
                setTimeout(self.goIdle, 5 * 60 * 1000);
            }
            else if (e.code === 'KeyI' || e.char === 'i' || e.key === 'i') {
                self.goIdle();
            }
        });
        
        (function updateTime() {
            self.setState({ time: getTime() });
            
            setTimeout(updateTime, 60 * 1000);
        })();
        
        (function nextBackground() {
            self.setState({ idleBackground: getRandomBackground() });
            
            setTimeout(nextBackground, 60 * 60 * 1000);
        })();
    }
    
    render () {
        let className = 'home';
        if (this.state.idle) {
            className += ' home-idle';
        }
        
        return (
            <div className={className}>
                <div className='info'>
                    <Greeting user={this.state.user}/>
                    <Weather forecast={this.state.forecast}/>
                </div>
                <div className='idle' style={{
                    backgroundImage: this.state.idleBackground
                    }}>
                    <div className='idle-time'>{this.state.time}</div>
                </div>
            </div>
        );
    }
}