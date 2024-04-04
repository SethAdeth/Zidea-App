"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';



export const Nav = () => {
    const {data: session} = useSession();

    const [toggleDropdown, setToggleDropdown] = useState(false)

    const [providers, setProviders] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const setUpProvider = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        setUpProvider();
    }, []);

    const handleSignIn = async () => {
        try {
            // Appel à signIn

            await signIn('google');

            // Si la connexion réussit, réinitialisez l'état d'erreur
            error(null);
        } catch (error) {
            // Si une erreur se produit, définissez l'état d'erreur avec le message d'erreur
            setError(error.message);
        }
    };

    return (
        <nav className='flex-between w-full mb-16 pt-10  navbar h-14'>
            <Link href="/" className='flex gap-2 flex-center mb-2'>
                <Image
                    src="/assets/images/logo.png"
                    alt='Z-idea'
                    width={50}
                    height={50}
                    className='object-contain'
                />
                <p className='logo_text'>Z-Idea</p>
            </Link>

            {/* {alert(session?.user)} */}

            {/*desktop navigation*/}
            <div className='sm:flex hidden mb-2'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>

                        <Link
                            href='/create'
                            className='blue_btn'
                        >
                            Ouvrir un Sujet
                        </Link>


                        <button
                            onClick={() => signOut()}
                            className='outline_btn'
                        >
                            Déconnexion
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                alt='Profile'
                                width={37}
                                height={37}
                                className='rounded-full'
                            />
                        </Link>
                    </div>



                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => handleSignIn()}
                                    className='blue_btn'
                                >
                                    Connexion
                                </button>
                            )
                            )
                        }
                    </>
                )}
            </div>

            {/* Mobile navigation*/}
            <div className='sm:hidden flex relative mb-2'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            alt='Profile'
                            width={37}
                            height={37}
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className='dropdwn_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Mon Profile
                                </Link>
                                <Link
                                    href="/create"
                                    className='dropdwn_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Ouvrir Un Sujet
                                </Link>

                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut()

                                    }}
                                    className='outline_btn mt-5 w-full'
                                >
                                    Déconnexion
                                </button>


                            </div>
                        )}

                    </div>
                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => handleSignIn()}
                                    className='blue_btn'
                                >
                                    Connexion
                                </button>
                            )
                            )
                        }

                    </>
                )}


            </div>

        </nav>
    )
}
