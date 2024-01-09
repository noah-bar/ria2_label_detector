import { ILabelDetector, Label } from "ILabelDetector";
import vision, {ImageAnnotatorClient} from "@google-cloud/vision";
import { existsSync } from 'fs'

export default class GoogleLabelDetector implements ILabelDetector {
    protected client: ImageAnnotatorClient
    constructor(keyFilename: string) {
        this.client = new vision.ImageAnnotatorClient({keyFilename})
    }
    
    public async analyze(imagePath: string, maxResults: number = 7, minConfidenceLevel: number = 90): Promise<Label[]> {
        let image: { source: { filename: string } | { imageUri: string } } = { source: { filename: imagePath } }
        if(!existsSync(imagePath)) {
            image = { source: { imageUri: imagePath } }
        }

        const [result] = await this.client.annotateImage({
            image: image,
            features: [{type: 'LABEL_DETECTION', maxResults: maxResults}]
        });
        if(!result.labelAnnotations) return []
        return result.labelAnnotations
            .map(label => ({ description: label.description, score: (label.score as number * 100) }) as Label)
            .filter(label => label.score >= minConfidenceLevel)
    }
}