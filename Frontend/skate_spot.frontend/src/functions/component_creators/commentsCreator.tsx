import { CommentDto } from '../../skate_spot_api/client'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import Comments from '../../components/social/comment/Comments'
import { getAllThunks } from '../../state/actions/thunk_creators/allThunks'

export const createCommentComponent = (p: {
  listItemId: string
  comments: CommentDto[]
  listViewType: ListViewTypes
}) => {
  const thunks = getAllThunks()[p.listViewType]

  return (
    <Comments
      listItemId={p.listItemId}
      comments={p.comments}
      commentAction={thunks.comment}
      likeAction={thunks.likeComment}
      deleteCommentAction={thunks.deleteComment}
      editCommentAction={thunks.editComment}
    />
  )
}
