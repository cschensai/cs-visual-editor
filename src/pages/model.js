export default {
  namespace: 'globalModel',
  state: {
    context: null,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
