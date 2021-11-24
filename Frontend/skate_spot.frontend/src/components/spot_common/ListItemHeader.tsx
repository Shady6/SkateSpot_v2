import React from "react";
import { ApiClient } from "../../skate_spot_api/apiClient";
import { ListViewTypes } from "../../state/generic/listViewGenerics";
import { ListItemActions } from "./ListItemActions";

interface Props {
  authorId: string;
  listItemId: string;
  listViewType: ListViewTypes;
  deleteFunc: (client: ApiClient, token: string) => Promise<void>;
}

export const ListItemHeader: React.FC<Props> = (p) => {
  return (
    <div className="d-flex mb-1 justify-content-between">
      {p.children}
      <ListItemActions
        authorId={p.authorId}
        listItemId={p.listItemId}
        listViewType={p.listViewType}
        deleteFunc={p.deleteFunc}
      />
    </div>
  );
};
