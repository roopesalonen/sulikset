import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryArea, VictoryLabel, VictoryScatter, VictoryAxis } from 'victory'
//import Temperature from './components/Temperature'
//import Humidity from './components/Humidity'


function Weather() {

    function convertUTCDateToLocalDate(date){ //muutetaan paikalliseen aikaan
        new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        return date;
    }

const initWeather = [];
const [weather, setWeather] = useState(initWeather);

//tuodaan json data api:sta
fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50000')
    .then(response => response.json())
    .then(json => setWeather([...json]));

    const deviceToShow = weather.filter(device => device.DeviceId.includes('300044001947393035313138'));

    let errorfix = 1;
    let Temp = [];
    let Hum = [];
        deviceToShow.slice(0, 24).reverse().map(weath => { //tuo jsonista 24 viimeisintä tulosta
        const fixedTime = String(convertUTCDateToLocalDate(new Date(weath.PublishedAt))); //tuodaan paikallinen aika
        const aika = fixedTime.split(' ')[4].split(':')[0] + ":" + fixedTime.split(' ')[4].split(':')[1]; //laitetaan kellonaika oikeen muotoon
        Temp.push({ time: String(aika), result: parseInt(weath.Temp) }); //x(time) saa kellonaika- ja y(result) lämpötiladatan
        Hum.push({ time: String(aika), result: parseInt(weath.Hum) }); //x(time) saa kellonaika- ja y(result) ilmankosteusdatan
        return <div key={errorfix++} />
})

return (
    <div align="center">
        <div>
            <VictoryChart                           //ylempi chart alkaa
                maxDomain={{ y: 35 }}               //chartin maximi arvo
                minDomain={{ y: -35 }}              //chartin minimi arvo
                theme={VictoryTheme.material}       //chartin teema
                domainPadding={{ x: 20, y: 10 }}    //chartin sisäreunojen leveydet
                width={1000}                        //chartin leveys
                height={220}                        //chartin korkeus
                style={{ parent: {border: "1px solid #ccc"} }}>

                <VictoryLabel text="Lämpötila" x={500} y={20} textAnchor="middle" />

                <VictoryLine
                    data={Temp}                     //ottaa lämpötiladatan api:sta
                    style={{ data: { stroke: "#ff6666", strokeWidth: 1.5 } }}   //viivan tyyli
                    interpolation="natural"         //tyyli jolla viiva menee pisteestä pisteeseen
                    x="time"                        //chartin x arvo nimetty
                    y="result"                      //chartin y arvo nimetty
                />

                <VictoryAxis style={{ tickLabels: { fontSize: 0 } }} />
                <VictoryAxis offsetY={50} />
                <VictoryAxis dependentAxis offsetX={50} />

                <VictoryScatter
                    data={Temp}                     //lämpötiladata api:sta
                    labels={({ datum }) => `${datum.result}°C`} //data jolla lämpötila näkyy viivan päällä
                    x="time"                        //chartin x arvo nimetty
                    y="result"                      //chartin y arvo nimetty
                />
                
            </VictoryChart>
            
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 20, y: 10 }}
                maxDomain={{ y: 100 }}
                minDomain={{ y: 0 }}
                width={1000}
                height={180}
                style={{ parent: {border: "1px solid #ccc"} }}>

                <VictoryLabel text="Ilmankosteus" x={500} y={20} textAnchor="middle" />

                <VictoryArea
                    data={Hum}
                    labels={({ datum }) => `${datum.result}%`}
                    style={{ data: { fill: "#87ceeb" } }}
                    interpolation="natural"
                    x="time"
                    y="result"
                />
            </VictoryChart>
        </div>
    </div>
)}

export default Weather;
