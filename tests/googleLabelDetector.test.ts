import '../src/GoogleLabelDetector'
import { resolve } from 'path'
import GoogleLabelDetector from "../src/GoogleLabelDetector";
import {existsSync} from "fs";

const keyPath = "./config/es-bi-noah.json"
const localImagePath = resolve("./data/image.webp")
const remoteImagePath = "https://media.istockphoto.com/id/1443562748/fr/photo/mignon-chat-gingembre.jpg?s=612x612&w=0&k=20&c=ygNVVnqLk9V8BWu4VQ0D21u7-daIyHUoyKlCcx3K1E8="
const labelDetector = new GoogleLabelDetector(keyPath);

describe('Test analyse method', () => {
  
})