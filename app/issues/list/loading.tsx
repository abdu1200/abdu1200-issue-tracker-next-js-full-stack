import { Table } from '@radix-ui/themes'
// import Skeleton from 'react-loading-skeleton'           //refactoring both
// import 'react-loading-skeleton/dist/skeleton.css'
import { Skeleton } from '@/app/components'
import ActionBtn from './actionBtn'

const LoadingIssuesPage = () => {
    const issues = [0, 1, 2, 4, 5, 6, 7]

  return (
    <div>
        <ActionBtn />
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell> Issue </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'> Status </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'> Created </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            
                { issues.map(issue => (  
                    <Table.Row key={issue}>  {/*we use the issues array only b/c key is needed for table row */}
                    <Table.Cell> 
                    <Skeleton />   
                    <div className='block md:hidden'> <Skeleton /> </div>
                    </Table.Cell> 
                    <Table.Cell className='hidden md:table-cell'> <Skeleton /> </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'> <Skeleton /> </Table.Cell>
                    </Table.Row>
                ))}
                
            
            </Table.Body>
        </Table.Root>
  </div>
  )
}

export default LoadingIssuesPage