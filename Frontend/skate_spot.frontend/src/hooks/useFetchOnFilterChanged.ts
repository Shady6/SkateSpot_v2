import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { SortOption } from '../skate_spot_api/client'
import { getAllCommonActions } from '../state/actions/allCommonActions'
import { getAllCommonThunks } from '../state/actions/thunk_creators/allCommonThunks'
import { ListViewTypes } from '../state/generic/listViewGenerics'
import { IAppliedFilter } from '../state/reducers/filtersReducer'
import { RootState } from '../state/store'

export const useFetchOnFilterChanged = (
  pageInitalized: boolean,
  listViewType: ListViewTypes,
  customFetchThunk?: any
) => {
  const dispatch = useDispatch()
  const appliedFilter = useSelector<RootState, IAppliedFilter>(
    state => state.filtersState.appliedFilter,
    _.isEqual
  )

  useEffect(() => {
    if (
      !pageInitalized ||
      (listViewType !== ListViewTypes.SPOTS &&
        appliedFilter.sort.option === SortOption.VIDEOS)
    )
      return
    dispatch(getAllCommonActions()[listViewType].reset())
    if (customFetchThunk) dispatch(customFetchThunk())
    else dispatch(getAllCommonThunks()[listViewType].fetchListItems())
  }, [appliedFilter])
}
