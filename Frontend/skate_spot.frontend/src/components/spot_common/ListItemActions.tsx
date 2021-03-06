import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiClient } from '../../skate_spot_api/apiClient'
import { TokenResponse } from '../../skate_spot_api/client'
import { getAllCommonThunks } from '../../state/actions/thunk_creators/allCommonThunks'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { RootState } from '../../state/store'
import { MoreVertWithTooltip } from '../shared/MoreVertWithTooltip'

interface Props {
  authorId: string
  listItemId: string
  listViewType: ListViewTypes
  deleteFunc: (client: ApiClient, token: string) => Promise<void>
}

export const ListItemActions: React.FC<Props> = p => {
  const user = useSelector<RootState, TokenResponse | undefined>(
    state => state.auth.content
  )
  const dispatch = useDispatch()

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return p.authorId === user?.id ? (
    <div style={{ position: 'relative' }}>
      <MoreVertWithTooltip
        isTooltipOpen={isTooltipOpen}
        setIsTooltipOpen={setIsTooltipOpen}>
        <div>
          <IconButton
            onClick={() => {
              dispatch(
                getAllCommonThunks()[p.listViewType].deleteListItem({
                  listItemId: p.listItemId,
                  deleteFunc: p.deleteFunc,
                })
              )
              setIsTooltipOpen(false)
            }}
            className='p-1'>
            <DeleteIcon style={{ cursor: 'pointer', fontSize: '1.1rem' }} />
          </IconButton>
        </div>
      </MoreVertWithTooltip>
    </div>
  ) : (
    <></>
  )
}
