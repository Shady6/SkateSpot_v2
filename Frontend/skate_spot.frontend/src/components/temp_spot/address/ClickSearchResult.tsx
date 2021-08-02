import { IGeoLocation } from '../../../types/types';

interface Props {
    location: IGeoLocation | null,
    showClickData: boolean
}

const ClickSearchResult: React.FC<Props> = ({ location, showClickData }) => {

    const render = () => {
        if (!showClickData) return;
        if (location?.address)
            return location.toString()
        return <p>No address found for this spot</p>
    }

    return (
        <div>
            {render()}
        </div>
    )
}

export default ClickSearchResult