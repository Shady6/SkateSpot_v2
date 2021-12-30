import { IconButton } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useMapExecuteOnClickOutsideOf } from '../../../hooks/map/useMapExecuteOnClickOutsideOf'
import { mapSpotsActions } from '../../../state/reducers/mapSpotsReducer'
import { FilterApplyCancelBtns } from '../../filters/FilterApplyCancelBtns'
import { SurfaceScoreFilter } from '../../filters/SurfaceScoreFilter'
import { TagsFilter } from '../../filters/TagsFilter'
import { filterBtnId } from './FilterBtnOnMap'
import { spotPreviewModalId } from './SpotsMapView'

export const filterModalId = 'filters-modal'

export const FiltersModal = () => {
  const dispatch = useDispatch()

  useMapExecuteOnClickOutsideOf({
    outsideOfIds: [filterModalId, filterBtnId, spotPreviewModalId],
    funcToExecute: _ => {
      dispatch(mapSpotsActions.toggleFilterModal(false))
    },
  })

  return (
    <div className='pt-2 pb-4 px-4 mt-2' id={filterModalId}>
      <div className='d-flex justify-content-end'>
        <IconButton
          onClick={_ => dispatch(mapSpotsActions.toggleFilterModal(false))}
          className='m-0 p-0'>
          <CloseIcon />
        </IconButton>
      </div>
      <SurfaceScoreFilter />
      <TagsFilter />
      <FilterApplyCancelBtns />
    </div>
  )
}
