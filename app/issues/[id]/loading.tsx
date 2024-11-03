import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='prose max-w-xl' >
      <Skeleton />
      <Flex gap="3" my="5">
        <Skeleton width='5rem'/>
        <Skeleton width='8rem' />
      </Flex>
      <Card> <Skeleton count={3}  /> </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage