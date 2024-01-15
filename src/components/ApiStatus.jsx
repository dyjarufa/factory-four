export function ApiStatus({ name, status }) {
  if (!status) {
    return <div>Loading status of {name}</div>
  }

  return (
    <div>
      <h2>{name}</h2>
      {status.error ? (
        <p>Error fetching status</p>
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
