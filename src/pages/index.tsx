import slugify from '@sindresorhus/slugify';
import { InferGetStaticPropsType } from 'next';
import { getBlogPosts } from '../services/github';

export async function getStaticProps() {
  const posts = await getBlogPosts();

  return { props: { posts } };
}

export default function Index({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul className='list-none markdown-body leading-normal px-5 m-0'>
      {posts.map((post) => (
        <li key={post.id} className='my-12'>
          <a
            href={`/blog/${post.id}/${slugify(post.title)}`}
            className='font-bold text-3xl border-b-0 mb-0 pb-0 underline text-black'
          >
            {post.title}
            <br />
          </a>
          <sub className='text-def text-gray-600'>{post.date}</sub>
          <p className='py-0 my-2'>{post.desc}</p>
        </li>
      ))}
    </ul>
  );
}
