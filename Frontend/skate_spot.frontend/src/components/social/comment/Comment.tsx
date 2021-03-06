import React, { useState } from 'react'
import { CommentDto } from '../../../skate_spot_api/client'
import { likeThunkCreator } from '../../../state/actions/thunk_creators/likeThunkCreator'
import { useRootState } from '../../../state/store'
import CommentLikes from './CommentLikes'
import { CommentActions } from './CommentActions'
import { editCommentThunkCreator } from '../../../state/actions/thunk_creators/editCommentThunkCreator'
import { deleteCommentThunkCreator } from '../../../state/actions/thunk_creators/deleteCommentThunkCreator'
import { CommentEdition } from './CommentEdition'

interface Props {
  comment: CommentDto
  listItemId: string
  likeAction: ReturnType<typeof likeThunkCreator>
  deleteCommentAction: ReturnType<typeof deleteCommentThunkCreator>
  editCommentAction: ReturnType<typeof editCommentThunkCreator>
}

const Comment: React.FC<Props> = p => {
  const auth = useRootState().auth
  const [isEditingComment, setIsEditingComment] = useState(false)

  return (
    <div className='mb-4'>
      <div className='mb-0 d-flex align-items-center'>
        <b className='me-1'>{p.comment.author?.userName}</b>
        <span style={{ color: '#8d8d8d', fontSize: '0.8rem' }}>
          <span>
            {new Date(p.comment.createdAt as unknown as string).toDateString()}
            {/* Value with year 1 means that no edit was made to comment */}
            {new Date(p.comment.editedAt).getFullYear() !== 1 && (
              <span className='ms-1'>[Edited]</span>
            )}
          </span>
        </span>
        {auth.content?.id === p.comment.authorId && (
          <CommentActions
            setIsEditingComment={setIsEditingComment}
            comment={p.comment}
            listItemId={p.listItemId}
            deleteCommentAction={p.deleteCommentAction}
            editCommentAction={p.editCommentAction}
          />
        )}
      </div>
      <div className='d-flex'>
        {isEditingComment ? (
          <CommentEdition
            comment={p.comment}
            listItemId={p.listItemId}
            editCommentAction={p.editCommentAction}
            setIsEditingComment={setIsEditingComment}
          />
        ) : (
          <p className='mb-1'>{p.comment.text}</p>
        )}
      </div>

      <CommentLikes
        likeAction={p.likeAction}
        listItemId={p.listItemId}
        commentId={p.comment.id as string}
        likes={p.comment.likes || []}
      />
    </div>
  )
}

export default Comment
