import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../state/reducers/filtersReducer'

export const ClearFilters = () => {
  const dispatch = useDispatch()
  return (
    <Button
      onClick={_ => dispatch(filterActions.clearFilters())}
      className='mt-5'
      variant='contained'
      color='secondary'>
      Clear
    </Button>
  )
}
