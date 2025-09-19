'use client'
import React, { useState } from 'react'
import styles from './index.module.css'

export interface ClauseFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  description?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ClauseField(props: ClauseFieldProps) {
  const { label, name, type = 'text', required, placeholder, description, value, onChange } = props
  const [touched, setTouched] = useState(false)

  const showError = required && touched && !value.trim()

  return (
    <div className={styles.Field}>
      <label className={styles.Label} htmlFor={name}>{label}{required ? ' *' : ''}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={styles.Input}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
      />
      {showError && (
        <div className={styles.Error}>Please enter your {label.toLowerCase()}</div>
      )}
      {description && <p className={styles.Description}>{description}</p>}
    </div>
  )
}


