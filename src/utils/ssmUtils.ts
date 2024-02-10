// src/ssmlUtils.ts
type SSMLInstruction = {
    type: 'text' | 'pause' | 'substitute'
    content: string
    pauseDuration?: number
}

export const parseSSML = (ssml: string): SSMLInstruction[] => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(ssml, 'text/xml')
    const instructions: SSMLInstruction[] = []

    const processNode = (node: ChildNode) => {
        switch (node.nodeName) {
            case 'break':
                const timeAttr = node.attributes.getNamedItem('time')?.value
                const pauseDuration = parseInt(timeAttr || '0', 10) * 1000 // Convert to milliseconds
                instructions.push({ type: 'pause', content: '', pauseDuration })
                break
            case 'say-as':
            case 'sub':
                const alias =
                    node.nodeName === 'sub'
                        ? node.attributes.getNamedItem('alias')?.value
                        : ''
                const textContent = alias || node.textContent || ''
                instructions.push({ type: 'substitute', content: textContent })
                break
            case 'audio':
                // Handling audio is complex due to limitations of the Web Speech API; omitted for brevity
                break
            case '#text':
                if (node.textContent?.trim()) {
                    // Check if the text node contains non-whitespace content
                    instructions.push({
                        type: 'text',
                        content: node.textContent.trim(),
                    })
                }
                break
        }

        // Always check for child nodes and process them recursively
        node.childNodes.forEach(processNode)
    }

    xmlDoc.childNodes.forEach(processNode)
    return instructions
}

export const speakSSMLInstructions = (
    instructions: SSMLInstruction[],
    speechSynth: SpeechSynthesis
) => {
    const speakNext = (index: number) => {
        if (index >= instructions.length) return

        const instruction = instructions[index]
        switch (instruction.type) {
            case 'text':
                const utterance = new SpeechSynthesisUtterance(
                    instruction.content
                )
                utterance.onend = () => speakNext(index + 1)
                speechSynth.speak(utterance)
                break
            case 'pause':
                setTimeout(
                    () => speakNext(index + 1),
                    instruction.pauseDuration
                )
                break
            case 'substitute':
                const subUtterance = new SpeechSynthesisUtterance(
                    instruction.content
                )
                subUtterance.onend = () => speakNext(index + 1)
                speechSynth.speak(subUtterance)
                break
        }
    }

    speakNext(0)
}
