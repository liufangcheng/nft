import { GlobalState } from '@/store/types';
import { useSelector, useDispatch } from 'react-redux';
import { ActionType } from './types';

export const useMyStore = () => {
  const state = useSelector((state: GlobalState) => state);
  const dispatch = useDispatch<ActionType>();
  return {
    state,
    dispatch,
  };
};
