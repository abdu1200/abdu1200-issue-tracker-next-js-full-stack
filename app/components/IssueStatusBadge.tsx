import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}

const statusMap:Record<Status, {label: String, color: 'red'|'yellow'|'green'}> = {
    OPEN : {label: 'open', color: 'red'},
    IN_PROGRESS: {label: 'in-progress', color: 'yellow'},
    CLOSED: {label: 'closed', color: 'green'}
}

const IssueStatusBadge = ({status} : Props) => {
  return (
    <Badge color={statusMap[status].color}> {statusMap[status].label} </Badge>
  )
}

export default IssueStatusBadge