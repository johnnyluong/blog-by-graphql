import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([])

  //the arrow function is the callback function
  //the array in the second arg is the dependency array
  //this only runs at the start to fill in categories
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);



  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Categories
      </h3>
      {categories.map((category: any, index: any) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default Categories