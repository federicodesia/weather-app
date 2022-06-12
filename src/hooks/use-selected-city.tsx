import { useContext, useMemo } from 'react'
import { CityContext } from '../context/city-context/city-context'

function useSelectedCity() {

    const { cityState } = useContext(CityContext)
    const { cities, selectedCityId } = cityState

    const selectedCity = useMemo(
        () => cities.find(
            city => city.id === selectedCityId
        ), [cities, selectedCityId]
    )

    return selectedCity
}

export default useSelectedCity