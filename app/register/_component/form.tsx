"use client";

import { ErrorMessage, Spinner } from "@/app/components"; //refactored
import { zodResolver } from "@hookform/resolvers/zod"; //to integrate zod validation with react-hook-form
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic"; //dynamic is a function
import { z } from "zod";
import { RegisterNewSchema } from "../../validationschemas";
import { Issue } from "@prisma/client";
import { signIn } from "next-auth/react";

// interface RegisterFormData {   //defines the shape of the form or generally interface is a type that defines a shape
//     title: string,
//     description: string
// }    + replaced by the bottom    why: if the schema properties change so that the RegisterFormData's also to change as well dynamically

type RegisterFormData = z.infer<typeof RegisterNewSchema>; //the right one returns a type and RegisterFormData infer its type based on the schema

const RegisterForm = () => {
  //the question mark is b/c the issue is optional herez( meaning: optional for RegisterForm but must for editissuepage)

  //formState is used for client side validation by 1st integrating react-hook-form with zod and it is also used to display errors & errors is destructured from the obj formState
  //to register the fields with react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    // useForm hook func takes a configuration object
    resolver: zodResolver(RegisterNewSchema), //integration of zod with the react-hook-form
  }); //useForm returns an object  and register is a func that returns an object

  const router = useRouter(); //router is an object

  const [error, setError] = useState("");
  const [isSpinning, setSpinning] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSpinning(true);

      await axios.post("/api/register", data); //this is to send the data to our api or it is calling the backend or it is http request or http call
      console.log(data);

      await signIn("credentials", {
        //to sign in right after the sign up
        email: data.email,
        password: data.password,
      });

      router.push("/"); //to redirect the user to the main page(to some page)
      // router.refresh(); //to counter the client side cashe for the dynamic pages
    } catch (error) {
      setSpinning(false);
      setError("error occured");
      {
        /*console.log  to see the axios error and in that error in the 'response' property, we will get the validation error given by zod*/
      }
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          {/*to produce genetic error*/}
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="insert an email" {...register("email")}>
          {" "}
        </TextField.Root>
        {/*here registering an input field with react-hook-form and props are spreaded to the comp at last */}
        <ErrorMessage> {errors.email?.message} </ErrorMessage>

        <TextField.Root
          placeholder="insert a password"
          {...register("password")}
        >
          {" "}
        </TextField.Root>
        {/*here registering an input field with react-hook-form and props are spreaded to the comp at last */}
        <ErrorMessage> {errors.password?.message} </ErrorMessage>

        <Button> Signup {isSpinning && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
