import './App.css';

import DarkPanel from './components/dark-panel/dark-panel'
import LightPanel from './components/light-panel/light-panel';
import WeatherLoader from './components/weather-loader/weather-loader';
import { CityContext } from './context/city-context/city-context';
import { CityProvider } from './context/city-context/city-provider';
import { ContextMenuProvider } from './context/context-menu-context/context-menu-provider';
import useMediaQuery from './hooks/use-media-query';

function App() {
  const isMobile = useMediaQuery('(max-width: 769px)')

  return (
    <div className='App'>
      <ContextMenuProvider>
        <CityProvider>
          <CityContext.Consumer>
            {
              context => context.cityState.isLoading
                ? <WeatherLoader />
                : isMobile
                  ? <DarkPanel />
                  : <div className='rounded-container'>
                    <LightPanel />
                    <DarkPanel />
                  </div>
            }
          </CityContext.Consumer>
        </CityProvider>
      </ContextMenuProvider>
    </div>
  )
}

export default App;