import { initialState } from './initialState';

const actions = {
  'update-settings': (state, action) => {
    const { settings } = action.payload;
    return {
      ...state,
      settings,
    };
  },
  'update-userInfo': (state, action) => {
    const { userInfo, userLoading } = action.payload;
    return {
      ...state,
      userLoading,
      userInfo,
    };
  },
  'update-tokenSecret': (state, action) => {
    const { tokenSecret } = action.payload;
    return {
      ...state,
      tokenSecret,
    };
  },
};

export type ActionTypes = keyof typeof actions;

export default function store(state = initialState, action) {
  return actions[action.type] ? actions[action.type](state, action) : state;
}
