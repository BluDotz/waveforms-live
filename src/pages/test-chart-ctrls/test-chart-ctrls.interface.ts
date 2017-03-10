export interface PreviousLaSettings {
    sampleFreq: number | null,
    bufferSize: number | null,
    active: boolean
}

export interface PreviousOscSettings {
    offset: number | null,
    gain: number | null,
    sampleFreqMax: number | null,
    bufferSizeMax: number | null,
    delay: number | null,
    active: boolean
}

export interface PreviousTrigSettings {
    instrument: string | null,
    channel: number | null,
    type: string | null,
    lowerThreshold: number | null,
    upperThreshold: number | null
}