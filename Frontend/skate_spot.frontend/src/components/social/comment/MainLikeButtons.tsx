import React from "react";
import { useLikes } from "../../../hooks/useLikes";
import { LikeDto } from "../../../skate_spot_api/client";
import { likeThunkCreator } from "../../../state/actions/genericListViewActions";
import { LikeButton } from "../like/LikeButton";

export function MainLikeButtons({
  likes,
  listItemId,
  likeAction,
}: {
  likes: LikeDto[];
  listItemId: string;
  likeAction: ReturnType<typeof likeThunkCreator>;
}) {
  const buttonsProps = useLikes({
    subjectId: listItemId,
    parentId: listItemId,
    likes: likes as unknown as {
      userId: string;
      positive: boolean;
    }[],
    likeAction,
  });

  return (
    <div>
      {buttonsProps.map((props) => (
        <LikeButton key={props.isPositive.toString()} {...props} />
      ))}
    </div>
  );
}
