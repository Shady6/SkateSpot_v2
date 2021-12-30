import React, { useState } from 'react'
import { FilterBtn } from './FilterBtn'
import { MyModal } from '../shared/MyModal'
import { FilterAndSortPane } from './FilterAndSortPane'
import { ListViewTypes } from '../../state/generic/listViewGenerics'

interface Props {
  listViewType: ListViewTypes
}

export const MobileFilterAndSort = (p: Props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
        <FilterBtn />
      </div>
      <MyModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        opacity={1}>
        <div className='pb-3 pe-4'>
          <FilterAndSortPane
            onApplyClick={() => setIsFilterModalOpen(false)}
            onClearClick={() => setIsFilterModalOpen(false)}
            listViewType={p.listViewType}
          />
        </div>
      </MyModal>
    </>
  )
}
