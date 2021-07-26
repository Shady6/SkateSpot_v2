import { useSelector } from 'react-redux';
import { RootState } from '../state/combinedReducers';

export const useRootState = () => {
    const authState = useSelector((state: RootState) => state)

    return authState;
}
