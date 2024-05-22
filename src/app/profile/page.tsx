'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import api from '@/lib/api'
import useAuthStore from '@/stores/auth'
import { useRouter } from 'next/navigation'
import getFile from '@/lib/getFile'
import styles from '@/styles/Profile.module.scss'
import Wrapper from '@/components/UI/wrapper'
import Button from '@/components/UI/button'
import Loader from '@/components/UI/loader'
import LoadingScreen from '@/components/UI/loading-screen'
import translations from '@/lib/translations'
import useLanguageStore from '@/stores/language'
import Avatar from '@/components/UI/avatar'

const Profile = () => {
    const { language } = useLanguageStore()
    const [profile, setProfile] = useState<any>(null)
    const { clearTokens } = useAuthStore()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)

            try {
                const { data: response } = await api.get('/users/me', {
                    params: { fields: ['id', 'first_name', 'last_name', 'avatar', 'role'] }
                })

                const { data } = response

                data.avatar = data.avatar ? await getFile(data.avatar) : null

                setProfile(data)
            } catch (error: any) {
                console.error('Fetch profile error:', error)
                if (error.response.status === 401) {
                    clearTokens()
                    router.push('/login')
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [clearTokens, router])

    if (isLoading) {
        return <LoadingScreen />
    }

    if (!profile) {
        return router.push('/login')
    }

    return (
        <Wrapper>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <div className={styles.info}>
                        {profile.avatar ? (
                            <Image
                                className={styles.avatar}
                                src={profile.avatar}
                                alt='Avatar'
                                width={300}
                                height={300}
                            />
                        ) : (
                            <Avatar />
                        )}
                        <div className={styles.id}>ID: {profile.id}</div>
                        <div className={styles.name}>
                            {profile.first_name} {profile.last_name}
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            clearTokens()
                            router.push('/login')
                        }}
                    >
                        {translations[language].logOut}
                    </Button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Profile
