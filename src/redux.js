const initialState = {
  count: 0,
  data: []
};

export default (state = initialState, event) => {
  if (event.type === "LOADED_DATA") {
    const newData = state.data.slice();
    newData.push(event.payload);
    return {
      count: state.count,
      data: newData
    };
  } else if (event.type === "INCREASE") {
    return {
      count: state.count + 1,
      data: state.data
    };
  }

  return state;
};

// Usually this is an async thunk etc
export const fakeLoadData = (data) => ({
  type: "LOADED_DATA",
  payload: data
});
export const getData = (state) => state.data;

export const increaseCount = () => ({
  type: "INCREASE"
});
export const getCount = (state) => state.count;
