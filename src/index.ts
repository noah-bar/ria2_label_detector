import GoogleLabelDetector from "./GoogleLabelDetector";
import express, {Request, Response, Router} from 'express'
import { resolve } from "path";
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()
const router = Router()

const keyFilename = resolve("./config/key.json")
const googleLabelDetector = new GoogleLabelDetector(keyFilename)

app.use(express.json())

router.post('/analyse', async (req: Request, res: Response) => {
  const image: string = req.body.image
  const maxResults: number = req.body.maxResults || 7
  const minConfidenceLevel: number = req.body.minConfidenceLevel || 90

  if(!image) {
    return res.status(422).send({
      errors: ["The request must contain an image"]
    })
  }
  try {
    const labels = await googleLabelDetector.analyze(image, maxResults, minConfidenceLevel)
    return res.json(labels)
  } catch(err: unknown) {
    return res.json({ errors: ['Unknown error']})
  }
})

app.use("/api/v1", router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})