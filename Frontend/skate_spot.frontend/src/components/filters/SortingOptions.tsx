import { Button, MenuItem, Select } from '@material-ui/core'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SortIcon from '@mui/icons-material/Sort'
import { useDispatch, useSelector } from 'react-redux'
import { SortOption } from '../../skate_spot_api/client'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { filterActions, ISorting } from '../../state/reducers/filtersReducer'
import { RootState } from '../../state/store'

interface Props {
  listViewType: ListViewTypes
}

export const SortingOptions = ({ listViewType }: Props) => {
  const sorting = useSelector<RootState, ISorting>(
    state => state.filtersState.filterInMaking.sort
  )
  const dispatch = useDispatch()
  return (
    <div className='d-flex'>
      <Select
        style={{ fontSize: '1rem' }}
        className='me-2'
        onChange={e =>
          dispatch(filterActions.setSortingOption(e.target.value as SortOption))
        }
        value={sorting.option}
        label='Age'>
        <MenuItem value={SortOption.CREATION_DATE}>Creation date</MenuItem>
        <MenuItem value={SortOption.LIKES}>Likes</MenuItem>
        <MenuItem value={SortOption.COMMENTS}>Comments</MenuItem>
        {listViewType === ListViewTypes.SPOTS && (
          <MenuItem value={SortOption.VIDEOS}>Videos</MenuItem>
        )}
      </Select>
      <Button
        onClick={() =>
          dispatch(filterActions.setSortAscending(!sorting.ascending))
        }>
        {sorting.ascending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        <SortIcon />
      </Button>
    </div>
  )
}
