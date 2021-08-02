import React from 'react';
import { IGeoLocation } from '../../../types/types';

interface Props {
    showClickData: boolean,
    fromGeocodeLocations: IGeoLocation[] | null
    showMore: boolean,
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>,
    setHoveredAddress: React.Dispatch<React.SetStateAction<number | null>>
}

const AddressSearchResults: React.FC<Props> = ({
    showClickData,
    fromGeocodeLocations,
    showMore,
    setShowMore
}) => {

    // TODO 
    // - on button hover increase size of respective marker
    // - on button click collapse addresses 

    const foo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e.currentTarget.getAttribute('key'))
    }

    const render = () => {
        if (showClickData) return;
        else if (showMore)
            return fromGeocodeLocations!.map((l, i) =>
            (
                <div key={l.getKey(i)}>
                    <button onMouseEnter={foo}>{`${i + 1}. ${l.toString()}`}</button>
                </div>)
            )

        else
            return (
                <div>
                    <button>
                        {fromGeocodeLocations![0].toString()}
                    </button>
                    <button onClick={() => setShowMore(true)}>Show more</button>
                </div>
            )
    }

    return (
        <div>
            {render()}
        </div>
    )
}

export default AddressSearchResults