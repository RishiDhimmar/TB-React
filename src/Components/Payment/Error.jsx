import React from 'react'
import { MdError } from "react-icons/md";

function Error() {
  return (
    <div className="container-fluid grad-bgc overflow-hidden">
        <div className="container col-4 text-center main-con d-flex align-items-center">
            <div className="heading fs-1 font-primary text-danger">
                Payment Unsuccess
            </div>
            <MdError className='text-danger'/>
            <button type="button" className="btn btn-outline-secondary mt-3 w-100 py-3 col-11">Go Back</button>
        </div>
    </div>
  )
}

export default Error