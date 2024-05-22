import React, { AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import styles from './styles.module.scss'

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        AriaAttributes {}

const Button = (props: Props) => {
    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    )
}

export default Button
