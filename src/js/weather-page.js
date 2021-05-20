
import { getWeather } from './weather-provider';

const weatherDisplayDiv = document.querySelector( '.weather-display' );
let btnWeather, cityName;

const getDivWeather = ( { temperature, description } ) => {

    const weatherHtml = `
    <div class="col-12 col-sm-6 temperature">
        <p id="temperature" class="d-inline"> ${temperature}° </p>
        <p id="description" class="d-inline align-self-center">| ${description} </p>
    </div>
    <div class="col-12 col-sm-6 align-self-right">
        <img src="./assets/${setImage(description)}.svg" alt="">
    </div>
    `;

    const divWeather = document.createElement('div');
    divWeather.classList +=  'row align-items-center justify-content-around text-center';
    divWeather.innerHTML = weatherHtml;
    weatherDisplayDiv.append( divWeather );

}

const getDivDetails = ( { cityName, feelsLike, humidity, windSpeed, country } ) => {

    const detailHtml = `
    <div class="row pb-4 justify-content-center">
        <h3> ${cityName}, ${country} </h3>
    </div>
    <div class="row justify-content-around text-center">
        <div class="col">
            <p id="humidity">
                <strong> ${feelsLike}°</strong> <br>
                Sensation 
            </p>
        </div>
        <div class="col">
            <p id="humidity">
                <strong> ${humidity}% </strong> <br>
                Humidity 
            </p>
        </div>
        <div class="col">
            <p id="humidity">
                <strong> ${windSpeed} km/h </strong> <br>
                Wind 
            </p>
        </div>
    </div>
    `;

    const divDetails = document.createElement('div');
    divDetails.classList +=  'container city-info pt-4';
    divDetails.innerHTML = detailHtml;
    weatherDisplayDiv.append( divDetails );

}

const getDivAlert = () => {
    const alertHtml = `
    There is no results for ${cityName}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    `;
    const divAlert = document.createElement('div');
    divAlert.classList += 'alert alert-danger'
    divAlert.role = 'alert';
    divAlert.innerHTML = alertHtml;

    weatherDisplayDiv.append( divAlert );
}

const clear = () => {
    while ( weatherDisplayDiv.hasChildNodes() ) {
        weatherDisplayDiv.removeChild( weatherDisplayDiv.firstChild );
    }
}

const setImage = ( description ) => {
    if( description.includes('rain') ) {
        return 'rainy';
    } else if( description.includes('clear') ) {
        return 'sunny';
    } else if( description.includes('cloud') ) {
        return 'cloudy';
    }
}

const changeUnits = () => {
    
}

const displayWeather = ( data ) => {
    clear();
    if( !data ) {
        getDivAlert( data );
    } else {
        getDivWeather( data );
        getDivDetails( data );
    }
}

const events = () => {

    btnWeather = document.querySelector('.searchBtn');

    btnWeather.addEventListener('click', async () => {

        cityName = document.querySelector( '#cityName' ).value;
        if ( cityName ) {
            btnWeather.disabled = true;
            displayWeather( await getWeather( cityName, "metric") );
            btnWeather.disabled = false;
        }

    });

}

export const init = () => {
    events();
}

// TODO: Change the image to show the weather description