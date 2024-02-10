import { useState } from 'react'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'
import { fetchRandomQuote } from '../api/fetchRandomQuote'

const RandomQuoteToSpeech = () => {
    const [quote, setQuote] = useState<string>('')
    const { speak, pause, resume, isSpeaking } = useSpeechSynthesis()

    const handleNewQuote = async () => {
        const newQuote = await fetchRandomQuote()
        setQuote(newQuote)
        speak(newQuote)
    }

    return (
        <div>
            <h1>Speech Synthesis App</h1>
            <p>{quote || 'Click "Load Quote" to start!'}</p>
            <button onClick={handleNewQuote}>Load Quote</button>
            {isSpeaking && <p>Speaking...</p>}
            <>
                <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
            </>
        </div>
    )
}

export default RandomQuoteToSpeech
