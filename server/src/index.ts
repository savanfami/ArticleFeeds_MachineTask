import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/connection'
import { corsOptions, PORT } from './config/env'
import { router } from './routes/routes'
import { Request,Response } from 'express'
connectDB()
dotenv.config()


const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
app.use(cookie())
app.use(cors(corsOptions))


app.use('/api',router)

app.use('*',(req:Request,res:Response)=>{
    res.status(404).json({success:false,message:'api not found',status:404})
})


// app.use(errorHandler)

app.listen(PORT,()=>{
 console.log(`server running on port http://localhost/${PORT}`)
})

