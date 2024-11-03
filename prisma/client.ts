import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

//when we create or modify the prisma model, the prisma cli automatically generates types based on our models and put it to prisma client
//so types like 'Issue', 'Status' ...are automatically generated from the model 

//'Record' is one of ts utility types that allows us to define key value pairs both having a particlular type