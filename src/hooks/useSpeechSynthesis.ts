import { useState, useCallback } from 'react'

interface SpeechSynthesisHook {
    isSpeaking: boolean
    speak: (text: string) => void
    pause: () => void
    resume: () => void
}

export const useSpeechSynthesis = (): SpeechSynthesisHook => {
    const [isSpeaking, setIsSpeaking] = useState(false)

    const speak = useCallback((text: string): void => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
    }, [])

    const pause = useCallback((): void => {
        window.speechSynthesis.pause()
        setIsSpeaking(false)
    }, [])

    const resume = useCallback((): void => {
        window.speechSynthesis.resume()
        setIsSpeaking(true)
    }, [])

    return { isSpeaking, speak, pause, resume }
}
