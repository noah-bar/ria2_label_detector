import GoogleLabelDetector from "./GoogleLabelDetector";
import express, {Request, Response, Router} from 'express'
import multer from 'multer'
import { resolve } from "path";

const PORT = 3000
const app = express()
const router = Router()
const upload = multer()

const keyFilename = resolve("./config/key.json")
const googleLabelDetector = new GoogleLabelDetector(keyFilename)

app.use(express.json())

app.use("/api/v1", router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})