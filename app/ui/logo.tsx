import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">QA</p> */}
      <Image
        src='../logo.svg'
        className="mr-2 rounded-full"
        width={200}
        height={200}
        alt={`logo`}
        
      />
    </div>
  );
}
