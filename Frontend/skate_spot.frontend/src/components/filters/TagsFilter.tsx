import { ITag, Tags } from '../temp_spot/add/tags/Tags'

interface Props {
  tags: ITag[]
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>
}

export const TagsFilter = ({ tags, setTags }: Props) => {
  return (
    <div className='mt-4'>
      <p className='m-0'>Tags</p>
      <Tags tags={tags} setTags={setTags} />
    </div>
  )
}
