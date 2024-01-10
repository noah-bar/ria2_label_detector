import '../src/GoogleLabelDetector'
import { resolve } from 'path'
import GoogleLabelDetector from "../src/GoogleLabelDetector";
import {existsSync} from "fs";
import dotenv from 'dotenv'

dotenv.config()

const googleCredentials = resolve(process.env.GOOGLE_CREDENTIALS_PATH as string)
const localImagePath = resolve("./data/image.jpg")
const remoteImagePath = "https://media.istockphoto.com/id/1443562748/fr/photo/mignon-chat-gingembre.jpg?s=612x612&w=0&k=20&c=ygNVVnqLk9V8BWu4VQ0D21u7-daIyHUoyKlCcx3K1E8="
const labelDetector = new GoogleLabelDetector(googleCredentials);

describe('Test analyse method', () => {
    it('should analyse local image with default value', async () => {
        //Given
        expect(existsSync(localImagePath)).toBeTruthy()

        //when
        const labels = await labelDetector.analyze(localImagePath)
        labels.forEach(label => {
            expect(label.score >= 90).toBeTruthy()
        })
        expect(labels.length).toBeLessThanOrEqual(7)
    })

    it('should analyse remote image with default value', async () => {
        //Given
        const res = await fetch(remoteImagePath, { method: 'HEAD'})
        expect(res.ok).toBeTruthy()

        //when
        const labels = await labelDetector.analyze(remoteImagePath)
        labels.forEach(label => {
            expect(label.score >= 90).toBeTruthy()
        })
        expect(labels.length).toBeLessThanOrEqual(7)
    })

    it('should analyse remote image with max label value', async () => {
        //Given
        const maxLabel = 5
        const res = await fetch(remoteImagePath, { method: 'HEAD'})
        expect(res.ok).toBeTruthy()

        //when
        const labels = await labelDetector.analyze(remoteImagePath, maxLabel)
        labels.forEach(label => {
            expect(label.score >= 90).toBeTruthy()
        })
        expect(labels.length).toBeLessThanOrEqual(maxLabel)
    })

    it('should analyse remote image with max min confidence level value', async () => {
        //Given
        const minConfidence = 60
        const res = await fetch(remoteImagePath, { method: 'HEAD'})
        expect(res.ok).toBeTruthy()

        //when
        const labels = await labelDetector.analyze(remoteImagePath, 7, minConfidence)
        labels.forEach(label => {
            expect(label.score < minConfidence).toBeFalsy()
        })
        expect(labels.length).toBeLessThanOrEqual(7)
    })

    it('should analyse remote image with custom values', async () => {
        //Given
        const minConfidence = 60
        const maxLabel = 5
        const res = await fetch(remoteImagePath, { method: 'HEAD'})
        expect(res.ok).toBeTruthy()

        //when
        const labels = await labelDetector.analyze(remoteImagePath, maxLabel, minConfidence)
        labels.forEach(label => {
            expect(label.score < minConfidence).toBeFalsy()
        })
        expect(labels.length).toBeLessThanOrEqual(maxLabel)
    })
})