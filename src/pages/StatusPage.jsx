import { useEffect, useState } from 'react'
import { ApiStatus } from '../components/ApiStatus'

const apiNames = ['accounts', 'assets', 'customers' /* outros nomes de API */]
const INTERVAL = 15000

export function StatusPage() {
  const [apiStatus, setApiStatus] = useState({})

  const fetchStatus = async (apiName) => {
    try {
      const response = await fetch(
        `https://api.factoryfour.com/${apiName}/health/status`
      )

      const data = await response.json()

      console.log('data', data)
      setApiStatus((prev) => ({ ...prev, [apiName]: data }))
    } catch (error) {
      setApiStatus((prev) => ({ ...prev, [apiName]: { error: true } }))
    }
  }

  useEffect(() => {
    apiNames.forEach((apiName) => fetchStatus(apiName))

    const interval = setInterval(() => {
      apiNames.forEach((apiName) => fetchStatus(apiName))
    }, INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {apiNames.map((apiName) => (
        <ApiStatus key={apiName} name={apiName} status={apiStatus[apiName]} />
      ))}
    </div>
  )
}
