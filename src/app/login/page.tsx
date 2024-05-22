'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/stores/auth'
import api from '@/lib/api'
import styles from '@/styles/Login.module.scss'
import Wrapper from '@/components/UI/wrapper'
import Button from '@/components/UI/button'
import Loader from '@/components/UI/loader'
import useLanguageStore from '@/stores/language'
import translations from '@/lib/translations'

const Login = () => {
    const { language } = useLanguageStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { setTokens } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)

        try {
            const { data: response } = await api.post('/auth/login', { email, password })

            const { data } = response

            console.log(data)

            setTokens(data.access_token, data.refresh_token)

            router.push('/profile')
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Wrapper>
            <div className={styles.content}>
                <div className={styles.login}>
                    <div className={styles.fields}>
                        <input
                            type='email'
                            placeholder={translations[language].email}
                            maxLength={50}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder={translations[language].password}
                            value={password}
                            maxLength={50}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? <Loader size={26} /> : translations[language].logIn}
                    </Button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Login
