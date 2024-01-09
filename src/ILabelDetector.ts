export type Label = {
    description: string,
    score: number
}

export interface ILabelDetector {
    analyze(imagePath: string, maxLabels?: number, minConfidenceLevel?: number): Promise<Label[]>
}

