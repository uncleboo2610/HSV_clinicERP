import React from 'react'
import useStaffTicket from '../../hooks/useStaffTicket'

export const ImagingDiagnosticPage = () => {
    const [data] = useStaffTicket();
    console.log(data)
    
  return (
    <div>ImagingDiagnosticPage</div>
  )
}
