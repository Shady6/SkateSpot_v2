import { IGeoLocation } from '../../../types/types';
import NoAddressFound from './NoAddressFound';

interface Props {
    location: IGeoLocation | null,    
}

const ClickSearchResult: React.FC<Props> = ({ location }) => {

    const render = () => {
        if (location?.address)
            return location.toString()
        else
            return <NoAddressFound/>
    }

    return (
        <div>
            {render()}
        </div>
    )
}

export default ClickSearchResult