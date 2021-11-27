import { Button, Checkbox, Slider, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterActions,
  ISurfaceScoreFilter,
} from '../../state/reducers/filtersReducer'
import { RootState } from '../../state/store'

export const SurfaceScoreFilter = () => {
  const surfaceFilter = useSelector<RootState, ISurfaceScoreFilter>(
    state => state.filtersState.filterInMaking.filter.surfaceScore
  )
  const dispatch = useDispatch()

  const handleSurfaceScoreInputChange = (value: number) => {
    if (value > 10) dispatch(filterActions.setSurfaceScore(10))
    else if (value < 1) dispatch(filterActions.setSurfaceScore(1))
    else dispatch(filterActions.setSurfaceScore(value))
  }

  return (
    <div className='mt-4'>
      <p className='m-0'>Surface score</p>
      <div className='d-flex align-items-center'>
        <Checkbox
          onChange={() => dispatch(filterActions.toggleSurfaceScore())}
          checked={surfaceFilter.enabled}
        />
        <Button
          disabled={!surfaceFilter.enabled}
          className='py-0'
          onClick={() => dispatch(filterActions.toggleSurfaceScoreGt())}
          style={{ fontSize: '1.2rem' }}>
          {surfaceFilter.gtFiltering ? '≥' : '<'}
        </Button>
        <Slider
          disabled={!surfaceFilter.enabled}
          min={1}
          max={10}
          value={surfaceFilter.score}
          onChange={(_, value) =>
            handleSurfaceScoreInputChange(value as number)
          }
        />
        <TextField
          disabled={!surfaceFilter.enabled}
          variant='standard'
          className='ms-3'
          value={surfaceFilter.score}
          size='small'
          onChange={e => handleSurfaceScoreInputChange(Number(e.target.value))}
          type='number'
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
      </div>
    </div>
  )
}
