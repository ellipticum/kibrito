import api from '@/lib/api'

const getLanguages = async () => {
    try {
        const { data: response } = await api.get(`/items/languages`)

        const { data } = response

        return data
    } catch (error: any) {
        console.error('Fetch languages error:', error)
        return null
    }
}

export default getLanguages
