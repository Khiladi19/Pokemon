
import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  return (
    <>
    <div className='pokedex-wrapper-outer'>
     <Link to ="/">
     <h1 id="pokedex-heading">Pokedex</h1>
     </Link>
    </div>
    <CustomRoutes/>
    </>
  )
}

export default App
