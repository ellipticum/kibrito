import api from '@/lib/api'
import useLanguageStore from '@/stores/language'

const getRestaurants = async () => {
    try {
        const { language } = useLanguageStore.getState()

        const { data: response } = await api.get('/items/restaurants', {
            params: {
                fields: ['id', 'main_image.*', 'translations.*'],
                filter: {
                    status: { _eq: 'active' }
                }
            }
        })

        const restaurants = response.data.map((restaurant: any) => {
            let translations = restaurant.translations.filter(
                (translation: any) => translation.language_code === language
            )

            if (translations.length === 0) {
                translations = restaurant.translations.filter(
                    (translation: any) => translation.language_code === 'en'
                )
            }

            if (translations.length === 0) {
                translations = [restaurant.translations[0]]
            }

            return {
                ...restaurant,
                translations
            }
        })

        console.log(restaurants)
        return restaurants
    } catch (error: any) {
        console.error('Fetch restaurants error:', error)
    }
}

export default getRestaurants
