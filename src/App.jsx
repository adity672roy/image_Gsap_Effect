import React, { useRef } from "react";
import img1 from "./images/kashmir.jpg";
import img2 from "./images/assam.jpg";
import img3 from "./images/kerala.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const container = useRef();
  const panel = useRef([]);
  panel.current = [];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        toggleActions: "restart pause resume none",
        scroller: container.current,
      });

      gsap.utils.toArray(panel.current).forEach((panel, index) => {
        gsap.to(panel, {
          backgroundPosition: "-100px",
          duration: 3,
          scrollTrigger: {
            trigger: panel,
            toggleActions: "play reverse play reverse",
          },
        });

        gsap.to(`.bullet-${index+1} `,{
          scale:1.6,
          scrollTrigger:{
            trigger: panel,
            toggleActions: "play reverse play reverse",
          }
        })
      });
    });

    return () => ctx.revert();
  }, []);

  const slider = [
    {
      title: "Kashmir",
      place: "Paradise on Earth",
      color: "text-[#a061a5]",
      img: img1,
    },
    {
      title: "Assam",
      place: "Land of Red Rivers and Blue Hills",
      color: "text-[#e9ab32]",
      img: img2,
    },
    {
      title: "Kerala",
      place: "God's Own Country",
      color: "text-[#598fe1]",
      img: img3,
    },
  ];

  const addToRef = (el) => {
    if (el && !panel.current.includes(el)) {
      panel.current.push(el);
    }
  };
  return (
    <div ref={container} className="container bg-[#f2f2f2]">
      <div className="fixed flex flex-col gap-12 justify-center items-center h-screen w-[10%]">
        {slider.map((s, index) => (
          <img
            key={index}
            src={s.img}
            alt={s.title}
            className={`bullet-${
              index + 1
            } object-cover rounded-full h-12 w-12`}
          />
        ))}
      </div>

      {slider.map((s, index) => (
        <section key={index} className="h-screen flex gap-6 snap-start">
          <div className="w-[35%]">
            <div className="flex flex-col items-center justify-center h-full">
              <h2
                className={`text-[1.5rem] ${s.color} uppercase font-semibold`}
              >
                {s.title}
              </h2>
              <h1 className="text-center text-[1rem] text-gray-500 text-semibold">
                {s.place}
              </h1>
            </div>
          </div>
          <div className="w-[65%]">
            <div
              ref={addToRef}
              className="image"
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "100%",
              }}
            ></div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
