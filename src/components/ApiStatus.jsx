import styles from './ApiStatus.module.css'

export function ApiStatus({ name, status }) {
  if (!status) {
    return (
      <div className={`${styles.statusCard} ${styles.statusLoading}`}>
        <h2>{name}</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const statusClass = status.error ? styles.statusError : styles.statusHealthy
  const statusText = status.error
    ? status.isUnavailable
      ? 'OUTAGE'
      : 'Error'
    : 'Healthy'
  const timeString = status.error
    ? ''
    : new Date(status.time).toLocaleTimeString()

  return (
    <div className={`${styles.statusCard} ${statusClass}`}>
      <h2>{name}</h2>
      <p>{statusText}</p>
      {status.error && (
        <>
          <p className={styles.statusCode}>{status.statusCode || 'N/A'}</p>
          <p className={styles.statusMessage}>
            {status.statusText || 'Unavailable'}
          </p>
        </>
      )}
      {!status.error && (
        <>
          <p>Message: {status.message}</p>
          <p>Hostname: {status.hostname}</p>
          <p>Time: {timeString}</p>
        </>
      )}
    </div>
  )
}
