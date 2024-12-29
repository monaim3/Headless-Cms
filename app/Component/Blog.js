"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://mukul.imaginebuilds.io/wp-json/wp/v2/posts?_embed', {
          auth: {
            username:process.env.NEXT_PUBLIC_WP_USERNAME, 
            password: process.env.NEXT_PUBLIC_WP_PASSWORD, 
          },
        });
        setPosts(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
  
    fetchPosts();
  }, []);
  
  console.log(posts)
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='Blog' className="container mx-auto p-4">
    <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Featured Image */}
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post.title.rendered}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
  
          {/* Content */}
          <div className="p-4 pb-8">
            {/* Title */}
            <h2
              className="text-2xl font-semibold mb-2 text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
  
            {/* Excerpt */}
            <div
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
  
            {/* Read More Button */}
            <a
              href={`/${post.id}`}
              className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Blog;
