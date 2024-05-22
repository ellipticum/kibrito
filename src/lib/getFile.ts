import api from '@/lib/api'

const getFile = async (id: string) => {
    try {
        const { data, headers } = await api.get(`/assets/${id}`, {
            responseType: 'blob'
        })
        const contentType = headers['content-type']
        const blob = new Blob([data], { type: contentType })
        return URL.createObjectURL(blob)
    } catch (error: any) {
        console.error('Fetch avatar error:', error)
        return null
    }
}

export default getFile
