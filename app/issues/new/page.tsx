// import IssueNewForm from '../_components/IssueNewForm'
import dynamic from 'next/dynamic'
import IssueNewFormSkeleton from './loading'

const IssueNewForm = dynamic( //to dynamically import/load the component
  () => import('@/app/issues/_components/IssueNewForm'),
  {
    ssr: false,
    loading: () => <IssueNewFormSkeleton />   
  }
)




const NewIssuePage = () => {
  return (
    <IssueNewForm />
  )
}

export default NewIssuePage