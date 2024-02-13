import { groq } from "next-sanity"
import { Post } from "../../../../../types";
import { client, urlFor } from "@/lib/createClient";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { RichText } from '@/components/RichText'

interface Props{
    params:{
        slug:string,
    }
}

export const revalidate = 30;

export const generateStaticParams = async () => {
    const query = groq`*[_type == 'post']{
        slug
    }`;
    const slugs: Post[] = await client.fetch(query);
    const slugRoutes = slugs.map((slug)=> slug?.slug?.current);
    return slugRoutes?.map((slug) => ({
        slug,
    }));
};

const slugPage = async ({params:{slug}}:Props) => {
    // console.log(slug);
    const query = groq`*[_type == 'post' && slug.current == $slug] {
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
    } | order(_createdAt asc)[0]`;
    const post: Post = await client.fetch(query,{slug});
    // console.log(post)
  return (
    <Container className="mb-10">
        <div className="flex items-center mb-10">
            <div className="w-full md:w-2/3">
                <Image 
                    src={urlFor(post?.mainImage).url()} 
                    alt="main-image"
                    width={500}
                    height={500}
                    className="w-full object-cover"
                />
            </div>
            <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5 px-4">
                <Image 
                    src={urlFor(post?.author?.image).url()} 
                    alt="author-image"
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full object-cover"
                />
                <p className="text-3xl text-[#5442ae] font-semibold">
                    {post?.author?.name}</p>
                <p className="text-center tracking-wide text-sm">
                    {post?.description}</p>
                <div className="flex items-center gap-3">
                    <Link href={'https://github.com/immadisetty-jaya-surya'} target="blank"
                    className="w-10 h-10 bg-gray-500 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
                    >
                        <FaGithub />
                    </Link>
                    <Link href={'https://www.instagram.com/j._sury.a/'} target="blank"
                    className="w-10 h-10 bg-[#bc1888] text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
                    >
                        <FaInstagram />
                    </Link>
                    <Link href={'https://www.linkedin.com/in/jaya-surya-immadisetty-9b1037228/'} target="blank"
                    className="w-10 h-10 bg-blue-500 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
                    >
                        <FaLinkedin />
                    </Link>
                </div>
            </div>
        </div>
        <div>
            {/* <p>body text</p> */}
            <PortableText value={post?.body} components={RichText} />
        </div>
    </Container>
  )
}

export default slugPage