
// Weather API
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey     = 'fdcd7390df27f99a49a700f4524eee08'; 

const formatData = ( data ) => {

    const {
        name: cityName,
        main: { temp: temperature, feels_like: feelsLike, humidity },
        wind: { speed },
        sys:  { country },
        weather: { description },
    } = data;

    return { cityName, temperature, feelsLike, humidity, speed, description, country };

}

const getWeather = async( city, units ) => {
    try {

        const response = await fetch( `${weatherUrl}?q=${city}&units=${units}&APPID=${apiKey}` );
        if( !response.ok ) throw new Error( `City ${city} not found` );
        const data = formatData( await response.json() );
        return data;

    } catch ( e ) {
        console.error( e.message );
        return null;
    }
}

export { getWeather };
