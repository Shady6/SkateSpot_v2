import { useDispatch } from 'react-redux'
import { useMapExecuteOnClickOutsideOf } from '../../../hooks/map/useMapExecuteOnClickOutsideOf'
import { mapSpotsActions } from '../../../state/reducers/mapSpotsReducer'
import { FilterApplyCancelBtns } from '../../filters/FilterApplyCancelBtns'
import { SurfaceScoreFilter } from '../../filters/SurfaceScoreFilter'
import { TagsFilter } from '../../filters/TagsFilter'

export const FiltersModal = () => {
  const dispatch = useDispatch()

  useMapExecuteOnClickOutsideOf({
    outsideOfId: 'filters-modal',
    funcToExecute: () => dispatch(mapSpotsActions.toggleFilterModal(false)),
  })

  return (
    <div className='pt-4 pb-5 px-4 mt-2' id='filters-modal'>
      <SurfaceScoreFilter />
      <TagsFilter />
      <FilterApplyCancelBtns />
    </div>
  )
}
