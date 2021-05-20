
import './styles.scss';

// * For alert dismissing
import 'bootstrap/js/dist/alert';
import $ from "jquery";

import { init as initWeather } from './js/weather-page';

$('.alert').alert();
initWeather();