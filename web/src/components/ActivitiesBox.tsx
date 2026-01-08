interface ActivitiesBoxProps {
  avatarImages: string[];
}

export default function ActivitiesBox({ avatarImages }: ActivitiesBoxProps) {
  return (
    <div className="relative size-full" data-name="Activities Box">
      <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-center p-[10px] relative size-full">
        <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">Activities (NFTs, SBTs, ....):</p>
          </div>
          <div className="h-[41px] shrink-0 w-[210px]" />
        </div>
        <div className="content-stretch flex gap-2 items-center justify-start overflow-clip relative shrink-0 w-full" data-name="Frame content">
          {avatarImages.map((image, index) => (
            <div key={index} className="relative shrink-0 size-10" data-name={`3D Avatar ${index + 1}`}>
              <div className="absolute bg-center bg-cover bg-no-repeat inset-0" style={{ backgroundImage: `url('${image}')` }} />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
