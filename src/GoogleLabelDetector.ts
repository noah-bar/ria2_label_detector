import { ILabelDetector, Label } from "ILabelDetector";
import vision, {ImageAnnotatorClient} from "@google-cloud/vision";

export default class GoogleLabelDetector implements ILabelDetector {
    protected client: ImageAnnotatorClient
    constructor(keyFilename: string) {
        this.client = new vision.ImageAnnotatorClient({keyFilename})
    }
    
    analyze(imagePath: string, maxLabels?: number | undefined, minConfidenceLevel?: number | undefined): Promise<Label[]> {
        throw new Error("Method not implemented.");
    }
}