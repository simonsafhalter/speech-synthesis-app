import { useState } from 'react'
import { parseSSML, speakSSMLInstructions } from '../utils/ssmUtils'

const SSMLtoSpeech = () => {
    const [ssml, setSSML] = useState<string>('')

    const handleSpeakClick = () => {
        const instructions = parseSSML(ssml)
        speakSSMLInstructions(instructions, window.speechSynthesis)
    }

    return (
        <div>
            <textarea
                value={ssml}
                onChange={(e) => setSSML(e.target.value)}
                placeholder="Enter SSML here..."
                rows={10}
                style={{ width: '80%', margin: '20px' }}
            />
            <button onClick={handleSpeakClick}>Speak</button>
        </div>
    )
}

export default SSMLtoSpeech
