import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueEditFormSkeleton from './loading'

const IssueEditForm = dynamic(
  () => import('@/app/issues/_components/IssueEditForm'),
  {
    ssr: false,
    loading: () => <IssueEditFormSkeleton />
  }
)



interface Props {
    params : { id : string}
}

const EditIssuePage = async ({params} : Props) => {    //the parameter is a route parameter object

    const issue = await prisma.issue.findUnique({
        where : {id : parseInt(params.id)}
    })

    if(!issue)
        notFound()

  return (
    <IssueEditForm issue={issue}/> 
  )
}

export default EditIssuePage

//    in this route: http://localhost:3000/issues/1/edit...is the route id parameter which is 'one' , is it passed to the edit page as well