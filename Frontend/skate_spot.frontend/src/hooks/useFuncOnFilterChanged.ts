import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { IAppliedFilter } from '../state/reducers/filtersReducer'
import { RootState } from '../state/store'

export const useFuncOnFilterChanged = (func: () => void) => {
  const appliedFilter = useSelector<RootState, IAppliedFilter>(
    state => state.filtersState.appliedFilter,
    _.isEqual
  )

  useEffect(() => {
    func()
  }, [appliedFilter])
}
