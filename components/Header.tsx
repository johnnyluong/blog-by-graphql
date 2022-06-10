import React, { useContext,useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState([])

    //the arrow function is the callback function
    //the array in the second arg is the dependency array
    //this only runs at the start to fill in categories
    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        // margin auto padding 10 
        <div className='container mx-auto px-10 mb-8'>
            {/* border bottom full width color 400 gray */}
            <div className='border-b w-full inline-block border-gray-400 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            johnny's blog
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category, index) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header