import React, { useContext } from 'react';
import {AppContext} from '../context/AppContext';
import Spinner from './Spinner';

function Blogs(){
  //context data consuming
  const {posts,loading}= useContext(AppContext)
  console.log(posts);
  return ( 
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[60px] mb-[60px]'>
      { loading?(<Spinner/>):(
          posts.length===0?(<div><p>No POST Found</p></div>):(posts.map((post)=>(
            <div key={post.id}>
                <p className='text-lg'><b>{post.title}</b></p>
                <p className='text-sm'>
                  By <span className='italic'>{post.author}</span> on <span className='underline font-bold'>{post.category}</span> 
                </p>
                <p className='text-sm'>Posted on {post.date}</p>
                <p className='text-md mt-2 mb-1'>{post.content}</p>
                <div className='flex gap-x-3 px-2'>
                  {post.tags.map((tag, index)=>{return <span key={index} className='text-blue-600 underline font-bold text-xs'>{`#${tag}`}</span>})}
                </div>
            </div>
          )))
        )
      }
    </div>
   )
}

export default Blogs