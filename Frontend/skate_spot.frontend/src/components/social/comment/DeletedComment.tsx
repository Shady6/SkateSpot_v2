import React from "react";

interface Props {}

export const DeletedComment: React.FC<Props> = () => {
  return (
    <div className="mb-4" style={{ color: "#949494" }}>
      <p className="m-0">[This comments has been deleted by user.]</p>
    </div>
  );
};
