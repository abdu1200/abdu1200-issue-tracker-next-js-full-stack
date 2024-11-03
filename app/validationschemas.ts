import { z } from "zod";

export const IssueNewSchema = z.object({
  title: z
    .string()
    .min(1, "the title must contain 1 or more than one characters")
    .max(255, "the title must contain less than or equal to 255 characters"),
  description: z
    .string()
    .min(1, "the description must contain 1 or more than one characters"),
});

export const IssueEditSchema = z.object({     
  title: z
    .string()
    .min(1, "the title must contain 1 or more than one characters")
    .max(255, "the title must contain less than or equal to 255 characters"),
  status: z  //here we can edit the status of the issue as well
    .string()
    .refine(
      (value) =>
        value === "OPEN" || value === "CLOSED" || value === "IN_PROGRESS",
      { message: 'the status must be "OPEN" or "CLOSED" or "IN-PROGRESS' }
    ),
  description: z
    .string()
    .min(1, "the description must contain 1 or more than one characters"),
});

export const RegisterNewSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});


export const patchIssueSchema = z.object({  //this is a schema for issues patch api endpoint
  title: z
    .string()
    .min(1, "the title must contain 1 or more than one characters")
    .max(255, "the title must contain less than or equal to 255 characters")
    .optional(),    //b/c when we hit the endpoint using postman, we may only give description or ...
  description: z
    .string()
    .min(1, "the description must contain 1 or more than one characters")
    .max(65535)
    .optional(),
  status: z  //here we can edit the status of the issue as well
    .string()
    .refine(
      (value) =>
        value === "OPEN" || value === "CLOSED" || value === "IN_PROGRESS",
      { message: 'the status must be "OPEN" or "CLOSED" or "IN-PROGRESS' }
    ).optional()
    ,
  assignedToUserId: z
    .string()
    .min(1, "AssgnedToUserId is required")
    .max(255)
    .optional()
    .nullable()

});

//title, desc, assig.. are properties