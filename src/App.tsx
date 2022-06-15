import './App.css';

import DarkPanel from './components/dark-panel/dark-panel'
import LightPanel from './components/light-panel/light-panel';
import WeatherLoader from './components/weather-loader/weather-loader';
import { CityContext } from './context/city-context/city-context';
import { CityProvider } from './context/city-context/city-provider';
import { ContextMenuProvider } from './context/context-menu-context/context-menu-provider';
import useMediaQuery from './hooks/use-media-query';

function App() {
  const isLarge = useMediaQuery('(min-width: 801px)')

  return (
    <div className='App'>
      <ContextMenuProvider>
        <CityProvider>
          <CityContext.Consumer>
            {
              context => context.cityState.isLoading
                ? <WeatherLoader />
                : !isLarge
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