import { config } from "dotenv";
config()

export const PORT=process.env.PORT as string
export const MONGO_URI=process.env.MONGO_URI as string
export const CLIENT=process.env.CLIENT as string
export const corsOptions = {
    origin: CLIENT,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  };

