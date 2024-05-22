import axios from 'axios'
import useAuthStore from '@/stores/auth'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken

    const excludePaths = ['/items', '/auth/refresh', '/auth/login']

    if (token && !excludePaths.some((path) => config.url?.includes(path))) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const { refreshToken, setTokens, clearTokens } = useAuthStore.getState()

            if (!refreshToken) {
                return
            }

            try {
                const { data } = await api.post('/auth/refresh', { refresh_token: refreshToken })

                setTokens(data.access_token, data.refresh_token)

                api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
                originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`

                return api(originalRequest)
            } catch (error: any) {
                clearTokens()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api
