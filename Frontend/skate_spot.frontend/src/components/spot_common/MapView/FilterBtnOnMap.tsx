import { IconButton } from '@material-ui/core'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useDispatch, useSelector } from 'react-redux'
import { mapSpotsActions } from '../../../state/reducers/mapSpotsReducer'
import { RootState } from '../../../state/store'

export const FilterBtnOnMap = () => {
  const dispatch = useDispatch()
  const isFilterModalOpen = useSelector<RootState, boolean>(
    state => state.mapSpotsReducer.isFilterModalOpen
  )

  return (
    <IconButton
      onClick={() => {
        dispatch(mapSpotsActions.toggleFilterModal(!isFilterModalOpen))
      }}
      className='on-top-of-map ms-2'
      id='filter-btn'>
      <FilterAltIcon />
    </IconButton>
  )
}
