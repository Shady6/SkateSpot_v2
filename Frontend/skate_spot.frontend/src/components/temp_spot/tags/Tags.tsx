import React from "react";
import Tag from "./Tag";

interface Tag {
  name: string;
  isSelected: boolean;
}

export const initialTags: Tag[] = [
  { name: "Skatepark", isSelected: false },
  { name: "Ledge", isSelected: false },
  { name: "Rail", isSelected: false },
  { name: "Stairs", isSelected: false },
  { name: "Bank", isSelected: false },
  { name: "Kicker", isSelected: false },
  { name: "Manualpad", isSelected: false },
  { name: "Flatground", isSelected: false },
  { name: "Quater", isSelected: false },
  { name: "Downhill", isSelected: false },
];

interface Props {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Tags: React.FC<Props> = ({ tags, setTags }) => {
  const toggleSelection = (tag: Tag) => {
    setTags(
      tags.map((t) => {
        if (t.name === tag.name) t.isSelected = !t.isSelected;
        return t;
      })
    );
  };

  return (
    <>
      <p>Select at least one tag</p>
      {tags.map((t) => (
        <Tag
          key={t.name}
          name={t.name}
          isSelected={t.isSelected}
          toggleSelection={() => toggleSelection(t)}
        />
      ))}
    </>
  );
};

export default Tags;
