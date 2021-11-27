import { ListViewTypes } from '../state/generic/listViewGenerics'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../state/store'
import { IFilter, IAppliedFilter } from '../state/reducers/filtersReducer'
import { getAllCommonActions } from '../state/actions/allCommonActions'
import { getAllCommonThunks } from '../state/actions/thunk_creators/allCommonThunks'

export const useFetchOnFilterChanged = (
  pageInitalized: boolean,
  listViewType: ListViewTypes
) => {
  const dispatch = useDispatch()
  const appliedFilter = useSelector<RootState, IAppliedFilter>(
    state => state.filtersState.appliedFilter
  )

  useEffect(() => {
    if (!pageInitalized) return
    dispatch(getAllCommonActions()[listViewType].reset())
    dispatch(getAllCommonThunks()[listViewType].fetchListItems())
  }, [appliedFilter])
}
