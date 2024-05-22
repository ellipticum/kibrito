import React from 'react'
import styles from './styles.module.scss'
import Loader from '@/components/UI/loader'
import Wrapper from '@/components/UI/wrapper'

const LoadingScreen = () => {
    return (
        <Wrapper>
            <div className={styles.content}>
                <Loader />
            </div>
        </Wrapper>
    )
}

export default LoadingScreen
