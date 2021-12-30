import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../state/reducers/filtersReducer'

export const ClearFilters = ({ onClick }: { onClick?: () => void }) => {
  const dispatch = useDispatch()
  return (
    <Button
      onClick={_ => {
        dispatch(filterActions.clearFilters())
        onClick && onClick()
      }}
      variant='contained'
      color='secondary'>
      Clear
    </Button>
  )
}
