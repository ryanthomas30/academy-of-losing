import { useLocation as useBaseLocation, Location as BaseLocation } from 'react-router-dom'

export interface Location extends BaseLocation {
	state: LocationState | null | undefined
}

export interface LocationState {
	from?: Location
}

export const useLocation = (): Location => {
	const location = useBaseLocation()
	return location as Location
}
