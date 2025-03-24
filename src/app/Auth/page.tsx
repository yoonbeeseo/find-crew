import { useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";

export default function AuthPage() {
  const params = useSearchParams()[0].get("target");

  const extractor = (params: string | null) => {
    if (!params) {
      return [];
    }
    const copy = params.replace(",", "");
    const split = copy.split(" ");
    return split.splice(0, 2);
  };

  const targets = extractor(params);

  const content = useSearchParams()[0].get("content");
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const refs = [ref1, ref2, ref3, ref4];
  const items = [1, 2, 3, 4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [x, setX] = useState(0);

  return (
    <div
      className={twMerge(
        "w-full h-screen snap-mandatory",
        isMobile ? "snap-x overflow-x-auto flex" : "snap-y overflow-y-auto"
      )}
      ref={containerRef}
    >
      {isMobile && (
        <div className="fixed w-full top-[50%] left-0 translate-y-[-50%]">
          <button
            className="w-10 h-auto px-2.5 absolute bottom-0 left-0"
            onClick={() => {
              if (currentIndex === 0) {
                return;
              }
              const index = currentIndex - 1;
              setCurrentIndex(index);
              refs[index].current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            이전
          </button>
          <button
            className="w-10 h-auto px-2.5 absolute bottom-0 right-0"
            onClick={() => {
              if (currentIndex === items.length - 1) {
                return;
              }
              const index = currentIndex + 1;
              setCurrentIndex(index);
              return refs[index].current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            다음
          </button>
        </div>
      )}
      {items.map((item, index) => (
        <div
          className={twMerge(
            "min-w-full h-full border-2 snap-start text-white ",
            isMobile ? "bg-theme" : "bg-black"
          )}
          key={item}
          ref={refs[index]}
          draggable
          onDragStart={(e) => {
            setCurrentIndex(index);
            setX(e.clientX);
            console.log("set currentindex to", index);
          }}
          onDragOver={(e) => {
            const isBigger = x > e.clientX;
            if (isBigger) {
              console.log("show previous slide");
              return refs[index - 1].current?.scrollIntoView({
                behavior: "smooth",
              });
            }
            console.log("show next slide");
            return refs[index + 1].current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          slide {item}
        </div>
      ))}
    </div>
  );
}
