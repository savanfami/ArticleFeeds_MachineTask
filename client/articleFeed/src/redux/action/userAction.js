import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../constants/axiosInstance";
import { handleError } from "../../utils/errorHandling";
import { config } from "../../constants/configurations";

export const Register = createAsyncThunk(
  "user/signup",
  async (req, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/register`,
        { data: req },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (req, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/login",
        { data: req },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const Logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/logout");
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
)

export const fetchUserData = createAsyncThunk(
  "user/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user",config);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
)


export const updateProfile = createAsyncThunk(
  'user/update-profile',
  async (req, { rejectWithValue }) => {
      try {
          const { data } = await axiosInstance.put('/profile', { data: req },config)
          return data
      } catch (error) {
          return rejectWithValue(handleError(error))
      }
  }
)
export const updatePassword = createAsyncThunk(
  'user/update-password',
  async (req, { rejectWithValue }) => {
      try {
          const { data } = await axiosInstance.put('/updatepassword', { data: req },config)
          return data
      } catch (error) {
          return rejectWithValue(handleError(error))
      }
  }
)