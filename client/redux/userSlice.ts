import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../app/store'

// Define a type for the slice state
interface UserState {
  user: {
    matric?: string;
    role?: string;
    firstName?: string;
    name?: string;
  };
  newValuesObject?: {};
}

// Define the initial state using that type
const initialState: UserState = {
  user: {} as any,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
    addNewValuesObject: (state, action: PayloadAction<any>) => {
      state.newValuesObject = action.payload;
    },
  },
});

export const { addUser, logout, addNewValuesObject } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
