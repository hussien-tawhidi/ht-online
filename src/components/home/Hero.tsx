import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <Image
        src={"/home/hero-banner.jpg"}
        alt='home banner'
        width={1000}
        height={500}
        className='object-cover w-full'
      />
    </div>
  );
}
