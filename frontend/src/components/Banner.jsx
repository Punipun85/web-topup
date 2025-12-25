import { useEffect, useState } from "react";

export default function Banner({ banners }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <img
      src={banners[current]}
      className="rounded-3xl mb-10"
      alt="Banner"
    />
  );
}