interface SocialNetworkBoxProps {
  isDetailButtonEnabled?: boolean;
}

export default function SocialNetworkBox({ isDetailButtonEnabled = true }: SocialNetworkBoxProps) {
  return (
    <div className="relative size-full" data-name="SocialNetwork Box">
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-3 relative size-full">
        <div className="box-border content-stretch flex gap-[15px] items-center justify-start px-2 py-0 relative shrink-0 w-full" data-name="Frame header">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">Social networks</p>
          </div>
          <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" />
          <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame">
            <div
              className={`absolute ${isDetailButtonEnabled ? 'bg-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} box-border content-stretch flex flex-col items-center justify-center left-[17px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0`}
              data-name="Login Button"
            >
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer">
                <div
                  className={`flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 ${isDetailButtonEnabled ? 'text-[#381e72]' : 'text-gray-500'} text-[16px] text-center text-nowrap tracking-[0.5px]`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <p className="leading-[24px] whitespace-pre">detail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
