import slugify from '@sindresorhus/slugify';
import { InferGetStaticPropsType } from 'next';
import { getBlogPosts } from '../../services/github';

export async function getStaticPaths() {
  const posts = await getBlogPosts();

  const paths = posts.map((post) => {
    return {
      params: {
        ...post,
        id: [post.id.toString(), slugify(post.title)],
      },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getBlogPosts().then((issues) => issues.find((issue) => issue.id.toString() === params.id[0])!);

  return { props: { post } };
}

export default function Page({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className='markdown-body'>
      <h1 className='font-bold border-b-0 mb-0 pb-0 text-4xl'>{post.title}</h1>
      <sub>{post.date}</sub>
      <article className='pt-10' dangerouslySetInnerHTML={{ __html: post.html }}></article>
    </section>
  );
}
