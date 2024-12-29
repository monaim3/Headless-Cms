import React from 'react';

import Blog from './Component/Blog';
import Banner from './Component/Banner';
import Products from './Component/Product';
import ContactForm from './Component/ContactForm';



export default  function page() {
  return (
    <div>
   
        <Banner></Banner>
        <Products></Products>
        <Blog></Blog>
        <ContactForm></ContactForm>
    </div>
  );
};

