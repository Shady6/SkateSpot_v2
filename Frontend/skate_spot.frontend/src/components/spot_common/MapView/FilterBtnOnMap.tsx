import React from 'react'
import { IconButton } from '@material-ui/core'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useDispatch, useSelector } from 'react-redux'
import { mapSpotsActions } from '../../../state/reducers/mapSpotsReducer'
import { RootState } from '../../../state/store'

export const filterBtnId = 'filter-btn'

export const FilterBtnOnMap = () => {
  const dispatch = useDispatch()
  const isFilterModalOpen = useSelector<RootState, boolean>(
    state => state.mapSpotsState.isFilterModalOpen
  )

  return (
    <IconButton
      onClick={e => {
        dispatch(mapSpotsActions.toggleFilterModal(!isFilterModalOpen))
      }}
      className='on-top-of-map ms-2'
      id={filterBtnId}>
      <FilterAltIcon />
    </IconButton>
  )
}
