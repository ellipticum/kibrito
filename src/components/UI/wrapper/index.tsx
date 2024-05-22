import React, { ReactNode, useEffect, useState } from 'react'

import styles from './styles.module.scss'
import Link from 'next/link'
import Container from '@/components/UI/container'
import useAuthStore from '@/stores/auth'
import Header from '@/components/UI/header'

interface Props {
    children: ReactNode
}

const Wrapper = ({ children }: Props) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                <Container>{children}</Container>
            </main>
        </div>
    )
}

export default Wrapper
