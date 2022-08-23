import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import Cargando from './Cargando'


export const Card = ({ lat, lon }) => {

    const [cordenadas, setcordenadas] = useState()
    const [Tempe, setTempe] = useState()
    const [Cambio, setCambio] = useState(true)
    const [Loadings, setLoading] = useState(true)
    
    useEffect(() => {
        if (lat) {
            const apikey = `32c88ad38808f8c95b6910955ffac814`
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
            axios.get(URL)
                .then(res => {
                    setcordenadas(res.data)
                    const temperatura = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)}  ºC`,

                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} ºF`
                    }
                    setTempe(temperatura)
                    setLoading(!Loadings)

                })
                .catch(res =>console.log((res)))
        }
    }, [lat, lon])

   const cambioButon=()=>{
     setCambio(!Cambio)
   }
   if(Loadings){
    return  <Cargando/>
   }else{
    return (
        <div className='container'>
             <div className='cabecera'>
             <h1>Wheather App</h1>
            <h2>Ciudad {cordenadas?.name}, {cordenadas?.sys.country}</h2>
             </div>
            <div className='cuerpo'>
                <ul className='cuerpoli'>
                    <li>
                        <span>Wind spped {cordenadas?.wind.speed} m/s</span>
                    </li>
                    <li>
                        <span>Clouds {cordenadas?.clouds.all} %</span>
                    </li>
                    <li>
                        <span>Pressure {cordenadas?.main.pressure} hPa</span>
                    </li>
                </ul>
                <div className='article'>
                    <img src={cordenadas && `http://openweathermap.org/img/wn/${cordenadas.weather[0].icon}@4x.png`} alt="" />
                    <span>"Description {cordenadas?.weather[0].description}"</span>
                </div>
                <div className='grados'>
                    <h4>{Cambio ? Tempe?.celsius: Tempe?.farenheit} </h4>
                   <button onClick={cambioButon}> {Cambio ? `cambio farenheit` : `cambio celsius`}</button>
                </div>

            </div>

        </div>
    )
}
   }
  
