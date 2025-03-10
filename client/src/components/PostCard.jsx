import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[200px] overflow-hidden rounded-lg sm:w-[430px] transition-all p-3'>
      <Link to={`/post/${post.slug}`}>
      <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        
        <span className='italic text-sm'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}