import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
    href: string,
    children: ReactNode
}

const Link = ({href, children}: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <div> 
        <RadixLink className='prose' >{children}</RadixLink> 
      </div>  {/*link component from next/link can not take multiple children so we used div*/}
    </NextLink>
  )
}

export default Link