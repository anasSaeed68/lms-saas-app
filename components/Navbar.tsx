"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const Navbar = () => {
  return (
    <nav className='navbar'>
   <Link href='/'>
      <div className='flex items-center gap-2.5 cursor-pointer'>
        <Image src='/images/logo.svg' alt='logo' width={46} height={44}/>
      </div>
   </Link>
   <div className='flex items-center gap-8'>
    <NavItems />
    <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
   </div>
    </nav>
  )
}

export default Navbar