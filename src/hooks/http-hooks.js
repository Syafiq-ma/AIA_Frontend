import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)

        try {
            console.log(url)
            const response = await fetch(url, {
                method,
                body,
                headers,
            })
            const responseData = await response.json()
            
            setIsLoading(false)
            return responseData
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
            throw err
        }
    }, [])

    return {isLoading, error, sendRequest}
}
