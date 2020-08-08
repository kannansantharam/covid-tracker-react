import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';
import Infobox from './Infobox';
import Map from './Map'
import Table from './Table';
import { sortData, showCirclesOnMap } from './util.js';
import Linegraph from './Linegraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countryInfo, setCountryInfo] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [mapCenter, setmapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796
  })
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([])
  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCountryInfo(data);
        })
    }
    getCountryInfo();
  }, [])
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setCountries(countries);
          setTableData(sortData(data));
          setmapCountries(data);
        });
    };
    getCountries();
  }, []);
  function onCountryChange(event) {
    const countryCode = event.target.value;
    let url = countryCode === "worldwide" ?
      "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const getCountryInfo = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
          setCountry(countryCode);
          setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
          console.log([data.countryInfo.lat, data.countryInfo.long])
          setmapZoom(4)
        })
    };
    getCountryInfo();

  }
  function onInfoboxClick(caseType) {
    if (caseType === "cases") {
      setCaseType("cases")
    } else if (caseType === "recovered") {
      setCaseType("recovered")
    } else {
      setCaseType("deaths");
    }
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl>
            <Select value={country} variant="outlined" onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox title="Confirmed"
            active={caseType === "cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            caseType="cases"
            onClick={() => onInfoboxClick("cases")} />
          <Infobox title="Recovered"
          active={caseType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            caseType="recovered"
            onClick={() => onInfoboxClick("recovered")} />
          <Infobox title="Deaths"
            active={caseType === "deaths"}
            cases={countryInfo.todayDeaths}
            caseType="deaths"
            total={countryInfo.deaths}
            onClick={() => onInfoboxClick("deaths")} />
        </div>
        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} caseType={caseType}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {caseType}</h3>
          <Linegraph caseTypes={caseType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
