import React, { useState } from 'react'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { MyModal } from '../shared/MyModal'
import { FilterBtn } from './FilterBtn'
import { SortPane } from './SortPane'

interface Props {}

export const MobileSort = (p: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <>
      <div        
        onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
        <FilterBtn />
      </div>
      <MyModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        opacity={1}>
        <div className='pb-3 pe-4'>
          <SortPane
            onApplyClick={() => setIsFilterModalOpen(false)}
            onClearClick={() => setIsFilterModalOpen(false)}
            listViewType={ListViewTypes.SPOT_VIDEOS}
          />
        </div>
      </MyModal>
    </>
  )
}
