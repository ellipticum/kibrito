import api from '@/lib/api'

const getLink = async (id: string) => {
    try {
        const { data } = await api.get(`/assets/${id}`)

        return data
    } catch (error: any) {
        console.error('Fetch link error:', error)
    }
}

export default getLink
