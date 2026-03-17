import React from 'react'
import Cipla from "../assets/Cipla.png";
import dettol from "../assets/dettol.png";
import dolo from "../assets/dolo.png";
import drReddys from "../assets/drReddys.png";
import Eno from "../assets/Eno.png";
import Himalaya from "../assets/Himalaya.png";
import Liv52 from "../assets/Liv52.png";
import Revital from "../assets/Revital.png";
import savlon from "../assets/savlon.jpg";
import sunPharma from "../assets/sunPharma.png";
import Volini from "../assets/Volini.png";
import coldFlue from "../assets/coldFlue.png";
import heartHealth from "../assets/heartHealth.png";
import immunity from "../assets/immunity.jpg";
import Diabetes from "../assets/Diabetes.jpg";
import crocinAdvance from "../assets/crocinAdvance.png";

const ShopSection = () => {

  const brands = [
    {
      name: "Cipla",
      logo: Cipla,
      desc: "Global pharmaceutical company delivering healthcare solutions.",
    },
    {
      name: "Sun Pharma",
      logo: sunPharma,
      desc: "One of India’s largest and trusted pharma brands.",
    },
    {
      name: "Dr. Reddy’s",
      logo: drReddys,
      desc: "Innovation‐driven medicines and wellness products.",
    },
    {
      name: "Himalaya",
      logo: Himalaya,
      desc: "Leading wellness & herbal health brand.",
    },
  ];

  const popularProducts = [
    {
      name: "Crocin Advance",
      img: crocinAdvance,
      brand: "GSK",
      price: "₹25",
      desc: "Fast and effective relief from headaches and fever.",
    },
    {
      name: "Revital H Capsules",
      img: Revital,
      brand: "Sun Pharma",
      price: "₹90",
      desc: "Vital vitamins and minerals for energy support.",
    },
    {
      name: "Volini Pain Relief Spray",
      img: Volini,
      brand: "Sun Pharma",
      price: "₹120",
      desc: "Instant relief for joint and muscle pain.",
    },
    {
      name: "Dettol Antiseptic Liquid 550 ml",
      img: dettol,
      brand: "Reckitt",
      price: "₹110",
      desc: "Trusted protection against germs and infections.",
    },
    {
      name: "Dolo 650 Tablet 15s",
      img: dolo,
      brand: "Micro Labs",
      price: "₹30",
      desc: "Relief from pain & fever – trusted worldwide.",
    },
    {
      name: "Liv 52 Tablet 100s",
      img: Liv52,
      brand: "Himalaya",
      price: "₹150",
      desc: "Herbal liver support supplement.",
    },
    {
      name: "ENO Fruit Salt Lemon Flavour",
      img: Eno,
      brand: "GSK",
      price: "₹15",
      desc: "Fast relief from acidity and heartburn.",
    },
    {
      name: "Savlon Hand Sanitizer 55 ml",
      img: savlon,
      brand: "ITC",
      price: "₹25",
      desc: "Kills 99.9% germs. Skin friendly.",
    },
  ];

  const healthIssues = [
    { title: "Cold & Flu", img: coldFlue },
    { title: "Diabetes Care", img: Diabetes },
    { title: "Heart Health", img: heartHealth },
    { title: "Immunity Boosters", img: immunity },
  ];

  return (
    <div>

      {/* Health Issues */}
      <section className="py-12 px-6 bg-sky-100">
        <h3 className="text-3xl font-bold mb-8 text-center text-sky-700">
          Common Health Issues
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {healthIssues.map((h, i) => (
            <a
              key={i}
              href={`/health-issue/${h.title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace("&", "and")}`}
              className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={h.img}
                  alt={h.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800">
                  {h.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-10 px-6 bg-sky-100">
        <h3 className="text-2xl font-semibold mb-6 text-center text-sky-700">
          Shop by Brand
        </h3>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {brands.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition p-6 text-center"
            >
              <img
                src={b.logo}
                alt={b.name}
                className="h-40 w-full mx-auto mb-3"
              />
              <h4 className="font-semibold text-gray-800 mb-2">
                {b.name}
              </h4>
              <p className="text-sm text-gray-600">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-10 px-6 bg-sky-100">
        <h3 className="text-2xl font-semibold mb-6 text-center text-sky-700">
          Shop by Popular Products
        </h3>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {popularProducts.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-40 flex items-center justify-center bg-white">
  <img
    src={p.img}
    alt={p.name}
    className="h-full w-full object-contain p-3"
  />
</div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-800">
                  {p.name}
                </h4>

                <p className="text-sm text-gray-600">
                  {p.desc}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-sky-700">
                    {p.price}
                  </span>

                  <a
                    href="#"
                    className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-3 py-1 rounded transition"
                  >
                    Add to Cart
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default ShopSection