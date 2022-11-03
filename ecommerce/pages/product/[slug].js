// the reason for it to be in a [] is because it will dynamically render it!

import React from 'react'
import { client, urlfor } from '../../lib/client'

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className='product-detail-container'>
        <div className='image-contianer'>
          <img src={urlfor(image && image[0])} />
        </div>
      </div>

    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query);
  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: slug }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductDetails