import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("m0md1dfbbbb", 12); //12 is a salt rounds
  const createdUser = await prisma.user.create({
    data: {
      name: "Johm three",
      email: "johm3@example.com",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5QC7JgWAelWvnWGevZ4YjsEZpmGStYe4BY_umnI3bA&s",
      password, // encrypted/hashed password
    },
  });

  console.log("User-Created:", createdUser); //to log the created data to the terminal
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//bcrypt is a libray for encrypting, decrypting and comparing a password
//seed is used for populating a database with initial data
