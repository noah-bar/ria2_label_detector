export type Label = {
    description: string,
    score: number
}

export interface ILabelDetector {
    analyze(imagePath: string, maxResults?: number, minConfidenceLevel?: number): Promise<Label[]>
}

