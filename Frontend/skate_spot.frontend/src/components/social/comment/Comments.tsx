import { TextField } from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send'
import React from 'react'
import { v4 } from 'uuid'
import { useComment } from '../../../hooks/social/useComment'
import { CommentDto } from '../../../skate_spot_api/client'
import { commentThunkCreator } from '../../../state/actions/thunk_creators/commentThunkCreator'
import { deleteCommentThunkCreator } from '../../../state/actions/thunk_creators/deleteCommentThunkCreator'
import { editCommentThunkCreator } from '../../../state/actions/thunk_creators/editCommentThunkCreator'
import { likeThunkCreator } from '../../../state/actions/thunk_creators/likeThunkCreator'
import Comment from './Comment'
import { DeletedComment } from './DeletedComment'

interface Props {
  comments?: CommentDto[]
  listItemId: string
  commentAction: ReturnType<typeof commentThunkCreator>
  likeAction: ReturnType<typeof likeThunkCreator>
  deleteCommentAction: ReturnType<typeof deleteCommentThunkCreator>
  editCommentAction: ReturnType<typeof editCommentThunkCreator>
}

const Comments: React.FC<Props> = p => {
  const { comment, setComment, sendComment } = useComment(
    p.listItemId,
    p.commentAction
  )

  return (
    <div className='mt-4'>
      <div className='d-flex align-items-end mb-3'>
        <TextField
          color='primary'
          className='me-2 flex-grow-1'
          variant='standard'
          label='Write something'
          multiline
          maxRows={4}
          value={comment}
          onChange={setComment}
          onKeyDown={e => {
            if (e.key === 'Enter') sendComment()
          }}
        />
        <SendIcon
          onClick={sendComment}
          style={{ cursor: 'pointer' }}
          color={comment ? 'inherit' : 'disabled'}
        />
      </div>

      {p.comments?.map(c =>
        c.isDeleted ? (
          <DeletedComment key={v4()} />
        ) : (
          <Comment
            deleteCommentAction={p.deleteCommentAction}
            editCommentAction={p.editCommentAction}
            key={v4()}
            listItemId={p.listItemId}
            comment={c}
            likeAction={p.likeAction}
          />
        )
      )}
    </div>
  )
}

export default Comments
