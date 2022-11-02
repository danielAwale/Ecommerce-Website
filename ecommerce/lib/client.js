//The process to connect sanity to the project! 

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: "an3xgt8i",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

//Sanity is going to give us access to the url where the images are stored

export const urlFor = (source) => builder.image(source);