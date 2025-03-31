import "./css/common-header.css"

const CommonHeader = () => {
  return (
    <div className="availability-header">
      <div className="availability-title">
        <div>Activity</div>
        <small>Event type</small>
      </div>
      <div className="availability-title">
        <div>Time Zone</div>
        <small>Indian Time Standard</small>
      </div>
    </div>
  )
}

export default CommonHeader
