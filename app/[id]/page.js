"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import axios from 'axios';

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams(); 
  const { id } = params;

  useEffect(() => {
    console.log('ID:', id); 
    if (!id) return;

    const fetchPost = async () => {
      try {
    
        const response = await axios.get(`https://mukul.imaginebuilds.io/wp-json/wp/v2/posts/${id}`,{
            auth: {
              username: 'mukul', 
              password: 'mukul0624*', 
            },
          });
          setPost(response.data);
          setLoading(false)

      } catch (err) {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className='w-3/4 mx-auto pt-24'>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

export default Post;
