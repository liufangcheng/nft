import { ActionTypes } from '@/store';

export type ActionType = (config: {
  type: ActionTypes;
  payload: Record<string, unknown>;
}) => void;
