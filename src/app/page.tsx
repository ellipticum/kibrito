'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import Image from 'next/image'
import useAuthStore from '@/stores/auth'
import { useRouter } from 'next/navigation'
import Wrapper from '@/components/UI/wrapper'
import getRestaurants from '@/lib/getRestaurants'
import styles from '@/styles/Profile.module.scss'
import Loader from '@/components/UI/loader'
import LoadingScreen from '@/components/UI/loading-screen'

const Page = () => {
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { accessToken, clearTokens } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)

            const restaurants = await getRestaurants()

            if (!restaurants) {
                router.push('/login')

                return
            }

            setRestaurants(restaurants)
            setIsLoading(false)
        }

        fetch()
    }, [accessToken])

    if (isLoading) {
        return <LoadingScreen />
    }

    if (!accessToken) {
        return router.push('/login')
    }

    return (
        <Wrapper>
            <div className={styles.restaurants}>
                {restaurants.map((restaurant) => (
                    <div className={styles.restaurant} key={restaurant.id}>
                        <Image
                            className={styles.image}
                            src={'/images/restaurant.png'}
                            alt={restaurant.title}
                            width={500}
                            height={500}
                        />
                        <div className={styles.info}>
                            <p className={styles.id}>{restaurant.id}</p>
                            <h3 className={styles.title}>{restaurant.translations[0].title}</h3>
                            <p className={styles.description}>
                                {restaurant.translations[0].description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Wrapper>
    )
}

export default Page
