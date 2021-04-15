import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner, Container, Table, Navbar, Nav, Card } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_API_KEY;

function WeatherNav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Weather</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#vietnam">Vietnam</Nav.Link>
          <Nav.Link href="#japan">Japan</Nav.Link>
          <Nav.Link href="#singapore">Singapore</Nav.Link>
          <Nav.Link href="#us">US</Nav.Link>
          <Nav.Link href="#uk">UK</Nav.Link>
          <Nav.Link href="#korea">Korea</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
function App() {
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState("Vietnam");
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
      <Card className="bg-dark text-white main-content">
        <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
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
      <div className="container mt-5">
        {/* <WeatherTable country={"Vietnam"} /> */}
        <WeatherInfo weather={weather} />
      </div>
    </div>
  );
}

export default App;
