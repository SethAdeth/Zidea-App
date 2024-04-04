"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Profile from '@components/Profile'


export default function MyProfile() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const reponse = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await reponse.json();

      setPosts(data);
    }

    if (session?.user.id) fetchPosts();

  },  [])

  const handleEdit = (post) => {
    router.push(`/update?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasComfirmed = confirm("are you sure you want to delete this posts")

    if(hasComfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
         
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Bienvenu Sur Votre Profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
