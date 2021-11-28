import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../state/reducers/filtersReducer'

export const ApplyFilters = () => {
  const dispatch = useDispatch()

  return (
    <Button
      onClick={_ => dispatch(filterActions.applyFilters())}
      className='me-2'
      variant='contained'
      color='primary'>
      Apply
    </Button>
  )
}
