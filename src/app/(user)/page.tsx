import BlogContent from "@/components/BlogContent";
import Hero from "@/components/Hero";
import { client } from "@/lib/createClient";

import { groq } from "next-sanity";

export const revalidate = 30;

const query = groq`*[_type == 'post'] {
  _id,
  _createdAt,
  _updatedAt,
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  },
  body[] {
    ...,
    _type == 'block' => {
      ...,
      children[] {
        ...,
        _type == 'span' => {
          ...,
          text
        }
      }
    }
  },
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  categories[]-> {
    title
  },
  description,
  title,
  slug {
    current
  }
} | order(_createdAt asc)
`

export default async function Home() {
  const posts = await client.fetch(query)
  // console.log(posts);
  
  return (
    <main>
      <Hero />
      <BlogContent posts={posts} />
    </main>
  );
}
