import { useEffect } from 'react'
import { filterActions } from '../state/reducers/filtersReducer'
import { useDispatch } from 'react-redux'

export const useClearFilters = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filterActions.clearFilters())
    return () => {
      dispatch(filterActions.clearFilters())
    }
  }, [])
}
