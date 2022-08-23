import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { Card } from './componentes/Card'




function App() {

  const [local, setlocal] = useState()
  useEffect(()=>{
    const success = pos =>{
      const position={
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setlocal(position)
    }
    navigator.geolocation.getCurrentPosition(success)

  },[])
  
  return (

    <div className="App">
     <Card lat={local?.lat} lon={local?.lon} />
     
    </div>
  )
}

export default App
