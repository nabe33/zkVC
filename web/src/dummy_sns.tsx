import { useState } from 'react'
import TopPage from './topPage'
import StatusBarIPhone from './components/StatusBarIPhone'

export default function Sns() {
  const [showTopPage, setShowTopPage] = useState(false);

  if (showTopPage) {
    return <TopPage />;
  }

  return (
    <div className="bg-white relative size-full" data-name="SNS" data-node-id="11:36">
      <div className="absolute left-[51px] top-[280px] w-[290px]" data-node-id="11:40">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip p-[8px] relative w-[290px]">
          <div className="box-border content-stretch flex flex-col gap-[11px] items-center justify-start overflow-clip px-1 py-0 relative shrink-0 w-full" data-node-id="11:41">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center w-full" data-node-id="11:42" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[40px]">Profile</p>
            </div>
            <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative shrink-0 w-full" data-node-id="11:43">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-black text-center text-nowrap whitespace-pre" data-node-id="11:44" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[40px] mb-0 text-[32px]">I'm a ...........</p>
                <p className="leading-[40px] mb-0 text-[32px]">...................</p>
                <p className="leading-[40px] mb-0 text-[32px]">...................</p>
                <p 
                  className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[36px] text-[28px] underline cursor-pointer" 
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  onClick={() => setShowTopPage(true)}
                >
                  MyDID
                </p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[51px] text-[57px] text-black text-center text-nowrap top-44 tracking-[-0.25px] w-[290px]" data-node-id="11:38" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[64px] whitespace-pre">SNS XYZ</p>
      </div>
      <div className="absolute box-border content-stretch flex gap-[154px] items-center justify-center left-0 pb-[19px] pt-[21px] px-4 top-0 w-[402px]" data-name="Status bar - iPhone" data-node-id="11:134">
        <StatusBarIPhone />
      </div>
    </div>
  );
}