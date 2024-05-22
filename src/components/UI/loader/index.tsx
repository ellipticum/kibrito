import React from 'react'
import styles from './styles.module.scss'

interface Props {
    size?: number
}

const Loader = ({ size = 40 }: Props) => {
    return <div className={styles.loader} style={{ width: size }}></div>
}

export default Loader
