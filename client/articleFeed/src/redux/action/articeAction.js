import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../constants/axiosInstance";
import { handleError } from "../../utils/errorHandling";
import { config } from "../../constants/configurations";

export const CreateArticle = createAsyncThunk(
    'user/create',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post('/create', { data: req },config)
            return data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

