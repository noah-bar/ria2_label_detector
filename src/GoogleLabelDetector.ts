import { ILabelDetector, Label } from "ILabelDetector";

export default class GoogleLabelDetector implements ILabelDetector {
    analyze(imagePath: string, maxLabels?: number | undefined, minConfidenceLevel?: number | undefined): Promise<Label[]> {
        throw new Error("Method not implemented.");
    }
}