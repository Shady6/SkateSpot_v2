import { Select, MenuItem, Button } from '@material-ui/core'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SortIcon from '@mui/icons-material/Sort'

export enum SortOption {
  CREATION_DATE,
  LIKES,
  COMMENTS,
  VIDEOS,
}

interface Props {
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>
  sortOption: SortOption
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>
  sortAscending: boolean
}

export const SortingOptions = ({
  setSortOption,
  sortOption,
  setSortAscending,
  sortAscending,
}: Props) => {
  return (
    <div className='d-flex'>
      <Select
        style={{ fontSize: '1rem' }}
        className='me-2'
        onChange={e => setSortOption(e.target.value as SortOption)}
        value={sortOption}
        label='Age'>
        <MenuItem value={SortOption.CREATION_DATE}>Creation date</MenuItem>
        <MenuItem value={SortOption.LIKES}>Likes</MenuItem>
        <MenuItem value={SortOption.COMMENTS}>Comments</MenuItem>
        <MenuItem value={SortOption.VIDEOS}>Videos</MenuItem>
      </Select>
      <Button onClick={() => setSortAscending(!sortAscending)}>
        {sortAscending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        <SortIcon />
      </Button>
    </div>
  )
}
