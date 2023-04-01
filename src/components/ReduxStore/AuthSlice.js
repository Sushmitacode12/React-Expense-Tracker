import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUsers = createAsyncThunk(
  "user/login",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(param.url, {
        email: param.enteredEmail,
        password: param.enteredPassword,
        returnSecureToken: true,
      });
      localStorage.setItem("token", response.data.idToken);
      return response.data;
    } catch (error) {
      alert("Authentication Failed");
      return rejectWithValue(error);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
        {
          idToken: param.idToken,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert("Authentication Failed");
      return rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
        {
          displayName: param.displayName,
          photoUrl: param.photoUrl,
          returnSecureToken: true,
          idToken: param.idToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert("Authentication Failed");
      return rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
        {
          requestType: param.requestType,
          idToken: param.idToken,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert("Authentication Failed");
      return rejectWithValue(error);
    }
  }
);

export const verifyPassword = createAsyncThunk(
  "user/verifyPassword",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo",
        {
          requestType: param.requestType,
          email: param.email,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert("Authentication Failed");
      return rejectWithValue(error);
    }
  }
);

const initialAuthState = {
  isLoading: false,
  token: "",
  userId: "",
  error: "",
  isLoggedIn: false,
  displayName: "",
  photoUrl: "",
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.isLoading = false;
      state.token = "";
      state.userId = "";
      state.error = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.idToken;
      state.userId = action.payload.email;
      state.error = "";
      state.isLoggedIn = true;
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.token = "";
      state.userId = "";
      state.error = action.error.message;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.displayName = action.payload.users[0].displayName;
      state.photoUrl = action.payload.users[0].photoUrl;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    });
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;