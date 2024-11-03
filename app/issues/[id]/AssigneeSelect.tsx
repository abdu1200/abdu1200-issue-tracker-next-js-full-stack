"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, {Toaster} from "react-hot-toast"; //toast is an object and Toaster is a comp

const AssigneeSelect = ( {issue}: {issue: Issue}) => {
  //const [users, setUsers] = useState<User[]>([]); //it is a type of an array of User objects

  // useEffect(() => {
  //   //we use useEffect hook to make a call to the backend(w/h is fetch data from the backend)
  //   const fetchUsers = async () => {
  //     //we can not make the callback function async..that is why we use custom func
  //     const { data } = await axios.get<User[]>("/api/users"); //this returns an object with an array in it and we destructure it and get the array
  //     setUsers(data);
  //   };
  //
  //   fetchUsers();
  // }, []);

  const {data : users, error, isLoading} = useQuery<User[]>({   //the hook returns a query object   //User[] is to say that the 'data' is an array of User type...User is defined in prisma  
    queryKey : ['users'],  //to usiquely identify each data in the cashe
    queryFn : () => axios.get('/api/users').then(res => res.data),
    staleTime : 1000 * 1000,  //90sec,
    retry : 2
  })

  if(error)
    return null;//if react query can not fetch the data, the AssigneeSelect comp returns null or nothing

  if(isLoading) return <Skeleton />

  return (  
    <>
      <Select.Root onValueChange={(userId) => {       //onValueChange event recieves the selected item's value as an argument(w/h is user's id or empty string when it is to unassign)
        axios.patch("/api/issues/" + issue.id,  { assignedToUserId : userId === "unassigned" ? null : userId}).catch(()=> {    //here if there is a userId then it is assigned to assignedToUserId or if userId is empty string then null is assigned to assignedToUserId
          toast.error("there is a problem with the api or backend request")   //to is the object to show the error
        })   
      }} defaultValue={issue.assignedToUserId || ""}    //this is when the page is refreshed, we want the assigned user to the issue to be selected
      >
      
        <Select.Trigger placeholder="assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
              <Select.Item value="unassigned">unassigned</Select.Item>    
              {users?.map( user => (
                <Select.Item key={user.id} value={user.id}> {user.name} </Select.Item> ) 
                )} 
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />   {/*this component has just have to be in this component or page*/}
    </>
  );
};

export default AssigneeSelect;

//we use useEffect hook to make a call to the backend
//useEffect hook contains a callback func and dependecy passed to it

//a map function is a function that takes an arrow function as an argument
//instead of using the state and effect, we should use react query/tanstack query b/c anytime the AssigneeSelect comp is rendered, the fetching is done also(it is not cached)
//checkout the QueryClientProvider component in the app dir


//reactquery doesn't fetch data by itself, it uses the fetch func and then it stores the data in its cashe 
//to fetch data we can use the axios lib or the fetch api
//to queryFN returns a promise that resolves to data
//with reactquery, we no longer need to use the use and effect hooks
// <> in these brackets, we specify the generic type argument
// in 'users?' - the question mark implies optional chaining(the users may or may not be undefined)
// a full reload of a page clears the client cashe   
// stale time is the time that treats the data as old w/h causes a refetch on rerender(going to another page and then coming back)
// reload of a page and rerendering is different
// retry is retries to fetch the same data 3 times in a row


// toast is to show notification when something happens like when an api request to the backend fails or something else
// axios.patch().catch()  - catch is to catch error from the patch request and do something with it
// and the catch func takes a callback function