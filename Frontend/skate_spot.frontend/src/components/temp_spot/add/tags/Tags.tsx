import React from 'react'
import { ObstacleType } from '../../../../skate_spot_api/client'
import Tag from './Tag'

export interface ITag {
  obstacleType: ObstacleType
  isSelected: boolean
}

export const initialTags: ITag[] = [
  { obstacleType: ObstacleType.Skatepark, isSelected: false },
  { obstacleType: ObstacleType.Ledge, isSelected: false },
  { obstacleType: ObstacleType.Rail, isSelected: false },
  { obstacleType: ObstacleType.Stairs, isSelected: false },
  { obstacleType: ObstacleType.Bank, isSelected: false },
  { obstacleType: ObstacleType.Kicker, isSelected: false },
  { obstacleType: ObstacleType.Manualpad, isSelected: false },
  { obstacleType: ObstacleType.Flatground, isSelected: false },
  { obstacleType: ObstacleType.Quater, isSelected: false },
  { obstacleType: ObstacleType.Downhill, isSelected: false },
]

interface Props {
  tags: ITag[]
  setTags: (tags: ITag[]) => void
}

export const Tags: React.FC<Props> = ({ tags, setTags }) => {
  const toggleSelection = (tag: ITag) => {
    setTags(
      tags.map(t => ({
        obstacleType: t.obstacleType,
        isSelected:
          t.obstacleType === tag.obstacleType ? !t.isSelected : t.isSelected,
      }))
    )
  }

  return (
    <>
      {tags.map(t => (
        <Tag
          key={t.obstacleType}
          name={t.obstacleType}
          isSelected={t.isSelected}
          toggleSelection={() => toggleSelection(t)}
        />
      ))}
    </>
  )
}
