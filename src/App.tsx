import './App.css';

import DarkPanel from './components/dark-panel/dark-panel'
import LightPanel from './components/light-panel/light-panel';
import { CityProvider } from './context/city-context/city-provider';
import { ContextMenuProvider } from './context/context-menu-context/context-menu-provider';

function App() {
  return (
    <div className='App'>
      <div className='main-container'>

        <ContextMenuProvider>
          <CityProvider>
            <LightPanel />
            <DarkPanel />
          </CityProvider>
        </ContextMenuProvider>
      </div>
    </div>
  );
}

export default App;