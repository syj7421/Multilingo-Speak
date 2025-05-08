import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPosts } from '@/components/mdx/utils'
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx/mdx'
import PostDate from '@/components/post-date'
import WidgetNewsletter from '@/components/widget-newsletter'
import WidgetSponsor from '@/components/widget-sponsor'
import WidgetPosts from '@/components/widget-posts'

export async function generateStaticParams() {
  const allBlogs = getBlogPosts();

  return allBlogs.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>
  }
): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  const { title, summary: description } = post.metadata;

  return {
    title,
    description,
  };
}

export default async function SinglePost(
  props: {
    params: Promise<{ slug: string }>
  }
) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) notFound()

  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      {/* Middle area */}
      <div className="grow">
        <div className="max-w-[700px]">
          {/* Back */}
          <div className="mb-3">
            <Link
              className="inline-flex text-sky-500 rounded-full border border-slate-200 dark:border-slate-800 dark:bg-linear-to-t dark:from-slate-800 dark:to-slate-800/30"
              href="/"
            >
              <span className="sr-only">Back</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
                <path className="fill-current" d="m16.414 17 3.293 3.293-1.414 1.414L13.586 17l4.707-4.707 1.414 1.414z" />
              </svg>
            </Link>
          </div>

          <article>
            {/* Post header */}
            <header>
              <div className="flex items-center justify-between mb-1">
                {/* Post date */}
                <div className="text-xs text-slate-500 uppercase">
                  <span className="text-sky-500">—</span> <PostDate dateString={post.metadata.publishedAt} /> <span className="text-slate-400 dark:text-slate-600">·</span> 4 Min read
                </div>
                {/* Share buttons */}
                <ul className="inline-flex">
                  <li>
                    <a
                      className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                      href="#0"
                      aria-label="Twitter"
                    >
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                      href="#0"
                      aria-label="Facebook"
                    >
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                      href="#0"
                      aria-label="Share"
                    >
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 14c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .223.029.439.075.649l-3.22 2.012A2.97 2.97 0 0 0 12 13c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.97 2.97 0 0 0 1.855-.661l3.22 2.012c-.046.21-.075.426-.075.649 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3a2.97 2.97 0 0 0-1.855.661l-3.22-2.012c.046-.21.075-.426.075-.649 0-.223-.029-.439-.075-.649l3.22-2.012A2.97 2.97 0 0 0 20 14Z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <h1 className="h1 font-aspekta mb-4">{post.metadata.title}</h1>
            </header>
            <div className="prose text-slate-500 dark:text-slate-400 max-w-none prose-p:leading-normal prose-headings:text-slate-800 dark:prose-headings:text-slate-200 prose-a:font-medium prose-a:text-sky-500 prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-pre:bg-slate-800 dark:prose-code:text-slate-200">
              <CustomMDX source={post.content} />
            </div>
          </article>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <WidgetNewsletter />
          <WidgetSponsor />
          <WidgetPosts />
        </div>
      </aside>
    </div>
  )
}
