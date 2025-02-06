import React from 'react'
import ReportList  from "../components/ReportList.js"
import { Link } from 'react-router-dom'

const Reports = () => {
  return (
      <div>
      <h1>Credit Report Data</h1>
      <ReportList />
      <Link to="/">
          <button>Back to Home</button>
      </Link>
  </div>
  )
}

export default Reports