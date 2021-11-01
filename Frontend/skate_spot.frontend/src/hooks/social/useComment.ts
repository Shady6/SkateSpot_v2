import { useDispatch } from "react-redux";
import { commentThunkCreator } from "../../state/actions/genericListViewActions";
import { useInputState } from "../util/useInputState";

export const useComment = (
  listItemId: string,
  commentAction: ReturnType<typeof commentThunkCreator>
) => {
  const [comment, setComment, resetCommentInput] = useInputState("");
  const dispatch = useDispatch();

  const sendComment = () => {
    if (!comment) return;
    dispatch(commentAction({ listItemId, text: comment }));
    resetCommentInput();
  };

  return {
    comment,
    setComment,
    sendComment,
  };
};
