import axios from 'axios'

export const fetchRandomQuote = async (): Promise<string> => {
    try {
        const response = await axios.get(
            'https://api.quotable.io/quotes/random'
        )
        return response.data[0].content
    } catch (error) {
        console.error('Error fetching quote', error)
        return 'Failed to fetch quote.'
    }
}
