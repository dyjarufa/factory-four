export function ApiStatus({ name, status }) {
  if (!status) {
    return <div>Loading status of {name}</div>
  }

  console.log('status', status)

  return (
    <div>
      <h2>{name}</h2>
      {status.error ? (
        <p style={{ color: status.isUnavailable ? 'red' : 'black' }}>
          {status.isUnavailable || 'unavailable'}
        </p>
      ) : (
        <>
          <p>Success: {status.success}</p>
          <p>Message: {status.message}</p>
          <p>Hostname: {status.hostname}</p>
          <p>Time: {status.time}</p>
        </>
      )}
    </div>
  )
}
