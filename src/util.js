import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral'

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
}
const caseTypeColors = {
    cases: {
        color: "#cc1034",
        multiplier: 800
    },
    recovered: {
        color: "#7dd71d",
        multiplier: 800
    },
    deaths: {
        color: "#333",
        multiplier: 1200
    }
}
export const showCirclesOnMap = (data, caseType = "cases") => {
    if (data) {
        let circles = data.map((country) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                fillColor={caseTypeColors[caseType].color}
                color={caseTypeColors[caseType].color}
                radius={Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier}
            >
                <Popup>
                    <div className="info-container">
                        <div className="info-flag"
                        style={{backgroundImage:`url(${country.countryInfo.flag})`}}
                        >
                          
                        </div>
                        <div className="info-name">{country.country}</div>
                        <div className="info-cases">
                            Cases : {numeral(country["cases"]).format("0,0")}
                        </div>
                        <div className="info-recovered">
                            Recovered : {numeral(country["recovered"]).format("0,0")}
                        </div>
                        <div className="info-deaths">
                            Deaths : {numeral(country["deaths"]).format("0,0")}
                        </div>
                    </div>
                </Popup>

            </Circle>
        ))
        return circles;
    }
}