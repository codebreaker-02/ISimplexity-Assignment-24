import './App.css'
import 'leaflet/dist/leaflet.css';
import MapComponent from './components/MapComponent'
import Bar from './components/Bar'
import data from './data/data'

function App() {
  return (
    <div className='container' style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <h1 style={{margin:'25px'}}>Network Availability</h1>
      <MapComponent data={data} />
      <Bar data={data}/>
    </div>
  )
}

export default App
