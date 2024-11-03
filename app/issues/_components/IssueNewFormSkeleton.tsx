import { Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components'


const IssueNewFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton  />
        <Skeleton height='10rem'/>
    </Box>
  )
}

export default IssueNewFormSkeleton