'use strict';
import React, { Component } from 'react';

export default class Weather extends Component {
    render () {
        const forecast = this.props.forecast;
        if (!forecast) {
            return (<div className='weather'>Loading weather...</div>);
        }
        else {
            const high = forecast.daily.data[0].temperatureMax + '°';
            const low = forecast.daily.data[0].temperatureMin + '°';
            return (
                <div className='weather component'>
                    <div className='weather-currently'>
                        <h4 className='weather-header'>currently</h4>
                        <div className='weather-icon-composite'>
                            <div className={'weather-icon ' + forecast.currently.icon}/>
                            <div className='weather-details'>
                                <h1>{forecast.currently.temperature}</h1>
                            </div>
                        </div>
                        <h2>{forecast.currently.summary}</h2>
                    </div>
                    <div className='weather-today'>
                        <h4 className='weather-header'>forecast</h4>
                        <div className='weather-icon-composite'>
                            <div className={'weather-icon ' + forecast.daily.icon}/>
                            <div className='weather-details'>
                                <h1 className='weather-daily-high'>
                                    {high}
                                </h1>
                                <h1 className='weather-daily-low'>
                                    {low}
                                </h1>
                            </div>
                        </div>
                        <h2>{forecast.daily.summary}</h2>
                    </div>
                </div>
            );
        }
    }
}