import './App.css';

import DarkPanel from './components/dark-panel/dark-panel'
import LightPanel from './components/light-panel/light-panel';
import { CityProvider } from './context/city-provider';

function App() {
  return (
    <div className='App'>
      <div className='main-container'>

        <CityProvider>
          <LightPanel />
          <DarkPanel />
        </CityProvider>
      </div>
    </div>
  );
}

export default App;