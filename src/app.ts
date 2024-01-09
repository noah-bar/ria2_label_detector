import path from "path";
import GoogleLabelDetector from "./GoogleLabelDetector";

const imagePath = path.resolve('./data/image.webp')
const labelDetector = new GoogleLabelDetector('./config/es-bi-noah.json')

const main = async () => {
    const labels = await labelDetector.analyze(imagePath, 10, 50)
    console.log(labels)
}

main().then()

