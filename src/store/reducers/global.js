const initialState = {
  collapsed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COLLAPSED':
      return { ...state, collapsed: action.collapsed};
    default:
      return state;
  }
}
