import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner, Navbar, Card, Button } from "react-bootstrap";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY,
  // `fetch` options to be sent with every request
  headers: { "X-Custom-Header": "foo" },
});
console.log({ unsplash });

const API_KEY = process.env.REACT_APP_API_KEY;
const cities = [
  {
    lat: "21.0278",
    lon: "105.8342",
    name: "Ha Noi",
  },
  {
    lat: "35.6828",
    lon: "139.7686",
    name: "Tokyo",
  },
  {
    lat: "40.7128",
    lon: "-74.0060",
    name: "New York City",
  },
  {
    lat: "37.5665",
    lon: "126.9780",
    name: "Seoul",
  },
  {
    lat: "48.8566",
    lon: "2.3522",
    name: "Paris",
  },
  {
    lat: "45.4215",
    lon: "-75.6972",
    name: "Ottawa",
  },
];

function WeatherNav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Weather</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
    </Navbar>
  );
}
function App() {
  const [weather, setWeather] = useState(null);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`
    );
    const json = await response.json();
    setWeather(json);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      getWeatherByCurrentLocation(latitude, longitude);
    });
  };
  useEffect(() => {
    getUserLocation();
  }, []);
  console.log(weather);

  if (!weather) {
    return (
      <div>
        <div className="container mt-5">
          <Spinner animation="border" variant="primary" size="lg" />
          <Spinner animation="grow" variant="secondary" size="lg" />
          <Spinner animation="border" variant="danger" size="lg" />
          <Spinner animation="grow" variant="warning" size="lg" />
        </div>
      </div>
    );
  }

  const WeatherInfo = ({ weather }) => {
    const temperatureC =
      weather && weather.main ? (weather.main.temp - 273.15).toFixed(2) : "";
    const temperatureF =
      weather && weather.main
        ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
        : "";
    return (
      <Card className="bg-dark text-black main-content">
        <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center m-5">
          <Card.Title>{weather?.name}</Card.Title>
          <Card.Text className="text-success h1">
            {`${temperatureC} °C / ${temperatureF} °F`}
          </Card.Text>
          <Card.Text className="text-info text-uppercase h2">
            {weather && weather.weather[0]?.description}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
  };

  return (
    <div className="App">
      <WeatherNav />
      <div className="m-3">
        {cities.map((c) => {
          return (
            <Button
              class="m-2"
              onClick={() => getWeatherByCurrentLocation(c.lat, c.lon)}
            >
              {c.name}
            </Button>
          );
        })}
      </div>
      <div className="container mt-5">
        <WeatherInfo weather={weather} />
      </div>
    </div>
  );
}

export default App;
