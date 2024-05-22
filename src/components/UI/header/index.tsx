'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Container from '@/components/UI/container'
import Link from 'next/link'
import useAuthStore from '@/stores/auth'
import translations from '@/lib/translations'
import useLanguageStore from '@/stores/language'
import getLanguages from '@/lib/getLanguages'

const Header = () => {
    const { language, setLanguage } = useLanguageStore()
    const { accessToken } = useAuthStore()

    const [languages, setLanguages] = useState<any[]>([{ code: 'en' }])
    const [links, setLinks] = useState<{ title: string; href: string }[]>([])

    useEffect(() => {
        const fetchLanguages = async () => {
            const data = await getLanguages()
            if (data) {
                setLanguages(data)
            }
        }

        fetchLanguages()
    }, [])

    useEffect(() => {
        if (translations[language]) {
            const updatedLinks = [
                {
                    title: translations[language].home,
                    href: accessToken ? '/restaurants' : '/login'
                },
                {
                    title: translations[language].profile,
                    href: accessToken ? '/profile' : '/login'
                }
            ]
            setLinks(updatedLinks)
        }
    }, [language, accessToken])

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.links}>
                    {links.map(({ title, href }, index) => (
                        <Link className={styles.link} key={index} href={href}>
                            {title}
                        </Link>
                    ))}
                </div>
                <div>
                    <select
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value)
                        }}
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.code.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </Container>
        </header>
    )
}

export default Header
