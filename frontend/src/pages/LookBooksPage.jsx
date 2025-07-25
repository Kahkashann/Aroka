import React from 'react'
import Breadcrumbs from '../components/BreadCrumbs'
import { Link } from 'react-router-dom'

const LookBooksPage = () => {

  const displayedimages = [
    {
      img: "/lookbooks/lookbook-1.jpeg",
      alt: "Noor",
      to: "/collections/noor"
    },
    {
      img: "/lookbooks/lookbook-2.jpg",
      alt: "Elevated Essentials",
      to: "/collections/elevated-essentials"
    },
    {
      img: "/lookbooks/lookbook-3.jpeg",
      alt: "Bloom",
      to: "/collections/bloom"
    },
    {
      img: "/lookbooks/lookbook-4.jpeg",
      alt: "What If",
      to: "/collections/what-if"
    },
    {
      img: "/lookbooks/lookbook-5.jpeg",
      alt: "Sea Within",
      to: "/collections/see-within"
    },
    {
      img: "/lookbooks/lookbook-6.jpg",
      alt: "Escape",
      to: "/collections/escape"
    },
    {
      img: "/lookbooks/lookbook-7.jpeg",
      alt: "Evanescence",
      to: "/collections/evanescence"
    },
    {
      img: "/lookbooks/lookbook-8.jpeg",
      alt: "Aroka",
      to: "/collections/alive"
    },
    {
      img: "/lookbooks/lookbook-9.jpeg",
      alt: "Labyrinth",
      to: "/collections/labyrinth"
    },


  ]


  return (
    <div className="w-full mx-auto py-8 mt-12 min-[900px]:mt-34">
      <Breadcrumbs />

      <h3 className='text-center text-xl font-light uppercase text-gray-800 py-4 mb-8'>LOOKBOOKS</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 justify-items-center px-10">
        {displayedimages.length > 0 ? (
          displayedimages.map((lookbook, index) => (
            <Link key={lookbook.alt} to={lookbook.to}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="w-full"
              >
                <img src={lookbook.img} alt={lookbook.alt} />
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center font-light text-lg text-gray-600 py-10">
            No products found in this section.
          </p>
        )}
      </div>
    </div>
  )
}

export default LookBooksPage