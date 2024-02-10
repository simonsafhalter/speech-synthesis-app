import { useState } from 'react'
import './App.css'
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis'
import { fetchRandomQuote } from './api/fetchRandomQuote'

const App = () => {
    const [quote, setQuote] = useState<string>('')
    const { speak, pause, resume, isSpeaking } = useSpeechSynthesis()

    const handleNewQuote = async () => {
        const newQuote = await fetchRandomQuote()
        setQuote(newQuote)
        speak(newQuote)
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Speech Synthesis App</h1>
                <p>{quote || 'Click "Load Quote" to start!'}</p>
                <button onClick={handleNewQuote}>Load Quote</button>
                {isSpeaking && <p>Speaking...</p>}
                <>
                    <button onClick={pause}>Pause</button>
                    <button onClick={resume}>Resume</button>
                </>
            </header>
        </div>
    )
}

export default App
