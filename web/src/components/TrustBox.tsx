interface TrustBoxProps {
  trustScore: number;
  activityScore: number;
  certificationLevel: number;
  communityEvaluation: number;
}

export default function TrustBox({
  trustScore,
  activityScore,
  certificationLevel,
  communityEvaluation
}: TrustBoxProps) {
  return (
    <div className="relative size-full" data-name="Trust Box">
      <div className="box-border content-stretch flex items-center justify-between px-2 py-0 relative size-full">
        <div className="basis-0 box-border content-stretch flex flex-col gap-[15px] grow h-[126px] items-start justify-start min-h-px min-w-px px-[5px] py-2.5 relative shrink-0" data-name="Score Frame">
          <div aria-hidden="true" className="absolute border border-[#4d4a4a] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">Trust:</p>
          </div>
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#fc0707] text-[28px] text-center" style={{ width: "min-content", fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px]">{trustScore}%</p>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-1 items-center justify-start overflow-clip p-[10px] relative shrink-0 w-[300px]" data-name="Score Details">
          <div className="h-7 left-[-1px] overflow-clip top-0.5 w-[300px]">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[22px] whitespace-pre">Activity Score: {activityScore} </p>
            </div>
          </div>
          <div className="h-7 left-[-1px] overflow-clip w-[300px]">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[22px] whitespace-pre">Certification level: {certificationLevel}</p>
            </div>
          </div>
          <div className="h-7 left-0 overflow-clip w-[300px]">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[22px] whitespace-pre">Community Evaluation: {communityEvaluation}</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
