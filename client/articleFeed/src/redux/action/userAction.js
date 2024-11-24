import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../constants/axiosInstance"
import { handleError } from "../../utils/errorHandling"
import { config } from "../../constants/configurations"


export const Register = createAsyncThunk(
    'user/signup',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(`/register`, { data: req },config)
            return data
        } catch (error) {
            console.log(error.response,'error . respone from signup')
            return rejectWithValue(handleError(error))
        }
    }
)