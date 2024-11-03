'use client'
import { Spinner } from '@/app/components'
import { Button, AlertDialog, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const DeleteIssueBtn = ({issueId}: {issueId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = async ()=> {
              
    try {
      // throw new Error();    
      setDeleting(true)
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues/list')   //to redirect the user to the issues page(to some page)
      router.refresh() //to counter the client side cashe for the dynamic pages
      
    } catch (error) {
      setDeleting(false)
      setError(true)
    }
    

  }

  return (
    <>
    <AlertDialog.Root> 
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}>
          Delete Issue
          {isDeleting && <Spinner/>}  
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description >Are you sure you want to delete this issue? This Action can not be undone.</AlertDialog.Description>
        <Flex mt='5' gap='5'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onDelete} color='red'>Delete Issue </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>   {/*the dialog box appears when an error occurs*/}
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>The issue could not be deleted</AlertDialog.Description>
        <Button color='gray' variant='soft' mt='3' onClick={() => setError(false)}> OK </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
    //when Cancel and Action btns are clicked, the dialog box will be removed automatically

    
  )
}

export default DeleteIssueBtn