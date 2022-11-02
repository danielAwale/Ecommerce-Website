import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations!</p>
      </div>

      <div className='products-container'>
        {products.map((product) => <Product key={product.id} product={product} />)}
      </div>

      <FooterBanner />
    </>
  )
}


//Next.js will pre-render this page on each request using the data returned by getServerSideProps.


export const getServerSideProps = async () => {
  // code below is the query to select all products from sanity
  const productQuery = '*[_type == "product"]'
  const products = await client.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}
export default Home