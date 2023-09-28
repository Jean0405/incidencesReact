import { useState, useEffect, useRef } from "react";
import LottieAnimation from "lottie-react";
import rocketAnimation from "../assets/Aniki Hamster.json"

export const LoadingAnimation = () => {

  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    setAnimationData(import("../assets/Aniki Hamster.json"));
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);


  if (!animationData) {
    return null;
  }

  return (
    isLoading &&
    <div ref={containerRef} className="bg-sky-300 grid place-items-center h-screen w-full">
      <LottieAnimation
        animationData={rocketAnimation}
        loop={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};