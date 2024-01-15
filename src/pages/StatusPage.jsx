import { useCallback, useEffect, useState } from 'react'
import { ApiStatus } from '../components/ApiStatus'
import { api } from '../api/axios'

const apiNames = [
  'accounts',
  'assets',
  'customers',
  'datapoints',
  'devices',
  'documents',
  'forms',
  'invites',
  'media',
  'messages',
  'namespaces',
  'orders',
  'patients',
  'relationships',
  'rules',
  'templates',
  'users',
  'workflows',
]
const INTERVAL = 5000

export function StatusPage() {
  const [apiStatus, setApiStatus] = useState({})

  const fetchStatus = useCallback(async (apiName) => {
    try {
      const { data } = await api.get(`/${apiName}/health/status`)

      setApiStatus((prev) => ({
        ...prev,
        [apiName]: { ...data, error: false },
      }))
    } catch (error) {
      const isUnavailable = error.response && error.response.status === 503
      setApiStatus((prev) => ({
        ...prev,
        [apiName]: { error: true, isUnavailable: isUnavailable },
      }))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      apiNames.forEach((apiName) => fetchStatus(apiName))
    }, INTERVAL)

    return () => clearInterval(interval)
  }, [fetchStatus])

  return (
    <div>
      {apiNames.map((apiName) => (
        <ApiStatus key={apiName} name={apiName} status={apiStatus[apiName]} />
      ))}
    </div>
  )
}
