'use client';

// import ErrorMessage from '@/app/components/ErrorMessage';   //refactoring both
// import Spinner from '@/app/components/Spinner';
import { ErrorMessage, Spinner } from '@/app/components';   //refactored
import { zodResolver } from '@hookform/resolvers/zod'; //to integrate zod validation with react-hook-form
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor"; //markdown editor statically imported
import dynamic from 'next/dynamic'; //dynamic is a function
import { z } from 'zod';
import { IssueNewSchema } from "../../validationschemas";
import { Issue } from '@prisma/client';



// const SimpleMDE = dynamic(    //lazy loading ....the comp SimpleMDE is dynamicly imported
//   ()=> import('react-simplemde-editor'),
//   { ssr:false}
// )



// interface IssueFormData {   //defines the shape of the form or generally interface is a type that defines a shape
//     title: string,
//     description: string
// }    + replaced by the bottom    why: if the schema properties change so that the IssueFormData's also to change as well dynamically 

type IssueFormData = z.infer<typeof IssueNewSchema>  //the right one returns a type and IssueFormData infer its type based on the schema



const NewIssuePage = ({issue}: {issue? : Issue}) => {     //the question mark is b/c the issue is optional herez( meaning: optional for newissuepage but must for editissuepage)

    //formState is used for client side validation by 1st integrating react-hook-form with zod and it is also used to display errors & errors is destructured from the obj formState
    //to register the fields with react-hook-form
     const {register, control, handleSubmit, formState:{errors}} = useForm<IssueFormData>({    // useForm hook func takes a configuration object
      resolver: zodResolver(IssueNewSchema)   //integration of zod with the react-hook-form
     })   //useForm returns an object  and register is a func that returns an object

     const router =  useRouter() //router is an object

     const [error, setError] = useState('')  
     const [isSpinning, setSpinning] = useState(false)

     const onSubmit = handleSubmit( async (data) => {
      try {
        setSpinning(true)
        if(issue)  //if there is an issue, then it is an 'update' otherwise it is a 'create'
          await axios.patch('/api/issues/' + issue.id, data)
        else
          await axios.post('/api/issues', data)   //this is to send the data to our api or it is calling the backend or it is http request or http call
        router.push('/issues/list')   //to redirect the user to the issues page(to some page)
        router.refresh() //to counter the client side cashe for the dynamic pages
      
      } catch (error) {
        setSpinning(false) 
        setError('error occured')
        {/*console.log  to see the axios error and in that error in the 'response' property, we will get the validation error given by zod*/}
      }

    } )

  
  return (
    <div className='max-w-xl'>
      { error && <Callout.Root className='mb-5'>   {/*to produce genetic error*/}
        <Callout.Text color="red">
          {error}
        </Callout.Text>
      </Callout.Root> }
      <form 
          className='max-w-xl space-y-3' onSubmit={onSubmit} >

          <TextField.Root defaultValue={issue?.title}   placeholder='insert a title'  { ...register("title")}   > </TextField.Root>   {/*here registering an input field with react-hook-form and props are spreaded to the comp at last */}
          <ErrorMessage> {errors.title?.message} </ErrorMessage> 
          
          <Controller   //this one is also to register an input field but the weird ones like the markdown's
              name="description"
              control= { control }
              defaultValue={issue?.description}
              render= { ({field}) => <SimpleMDE placeholder='insert a description'  {...field} /> }   //this prop is the func for rendering the input field and the spreaded field is an object with the same properties as the above register 
          />   {/*field is an object that returns an object*/}
          <ErrorMessage> {errors.description?.message} </ErrorMessage>

          <Button>
            {issue ? 'Update Issue' : 'Create New Issue' }
            {isSpinning && <Spinner />} 
          </Button>
      </form>
    </div>
  )
}
//client side validation means the data is not sent to the api until it is validated(the validation is before sending the data to the api)
//so the axios thing(or the generic error thing) is a server side validation
// {errors.title && <ErrorMessage> {errors.title.message} </ErrorMessage> }
// it is not good to use inline functions inside of a markup if the content/logic is more than 2 lines of code
// is is not good to use or make an api or http call or http request inside of a component(we should use another module/function for it for 'separation of concerns idea') if it is repetitive
// navigator is one of the browser api's
// lazy loading of a component disables the SSR of the comp


export default NewIssuePage