import { useState } from 'react'

export interface AlertState {
  show: boolean
  text: string
  type: string
}

interface ShowAlertParams {
  text: string
  type?: string
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({ show: false, text: '', type: 'danger' })

  const showAlert = ({ text, type = 'danger' }: ShowAlertParams) => {
    setAlert({ show: true, text, type })
  }

  const hideAlert = () => {
    setAlert({ show: false, text: '', type: 'danger' })
  }

  return { alert, showAlert, hideAlert }
}

export default useAlert
