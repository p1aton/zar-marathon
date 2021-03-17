import { createSlice } from '@reduxjs/toolkit';


export const slice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: {},
  },
  reducers: {
    fetchUser: () => ({
      isLoading: true,
    }),
    updateUser: (state, action) => ({
      isLoading: false,
      data: action.payload,
    }),
    removeUser: () => ({
      isLoading: false,
      data: {},
    })
  }
})


export const {fetchUser, updateUser, removeUser} = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;

export const getUserAsync = () => async (dispatch) => {
  const idToken = localStorage.getItem('idToken');
  if (idToken) {
    dispatch(fetchUser());
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        idToken,
      })
    };

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDuLSTvajHJ_NH4Ton-KtdLifW2xUzbsDQ`, requestOptions).then(res => res.json());
    console.log("🚀 ~ file: user.js ~ line 44 ~ getUserAsync ~ response", response)
    if (response.hasOwnProperty('error')) {
      localStorage.removeItem('idToken');
      dispatch(removeUser());
    } else {
      dispatch(updateUser(response.users[0]));
      console.log("🚀 ~ file: user.js ~ line 49 ~ getUserAsync ~ response.user[0]", response.users[0])
    }

  } else {
    dispatch(removeUser());
  }
}


export default slice.reducer; 