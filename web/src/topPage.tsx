import { useState } from 'react'
import MyPage from './myPage'
import StatusBarIPhone from './components/StatusBarIPhone'
import PageHeader from './components/PageHeader'
import DIDBox from './components/DIDBox'
import VCBox from './components/VCBox'
import TrustBox from './components/TrustBox'
import avatar12Img from './assets/avatar-12.png';
import avatar10Img from './assets/avatar-10.png';
import driversLicenseLogoImg from './assets/drivers-license-logo.png';
import tokyoUniversityLogoImg from './assets/tokyo-university-logo.png';
import settingsIconImg from './assets/settings-icon.svg';

function Component3DAvatars12() {
  return (
    <div className="relative size-full" data-name="3D Avatars / 12" data-node-id="6:270">
      <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="Avatars / 3d_avatar_12" data-node-id="6:271" style={{ backgroundImage: `url('${avatar12Img}')` }} />
    </div>
  );
}

function Component3DAvatars10() {
  return (
    <div className="relative size-full" data-name="3D Avatars / 10" data-node-id="6:262">
      <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="Avatars / 3d_avatar_10" data-node-id="6:263" style={{ backgroundImage: `url('${avatar10Img}')` }} />
    </div>
  );
}

// SocialNetwork Box component
function SocialNetworkBox() {
  return (
    <div className="relative size-full" data-name="SocialNetwork Box" data-node-id="78:306">
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-3 relative size-full">
        <div className="box-border content-stretch flex gap-[15px] items-center justify-start px-2 py-0 relative shrink-0 w-full" data-name="Frame header" data-node-id="11:152">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="11:153" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">Social networks</p>
          </div>
          <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" data-node-id="11:154" />
          <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame" data-node-id="11:155">
            <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-[17px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0" data-name="Login Button" data-node-id="11:156">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I11_156-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I11_156-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
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

interface IconButtonProps {
  icon?: React.ReactNode | null;
  style?: "filled" | "outlined" | "standard" | "tonal";
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
}

function IconButton({ icon = null }: IconButtonProps) {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative size-full" data-name="Style=standard, State=enabled" data-node-id="7:88">
      <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative rounded-[100px] shrink-0" data-name="container" data-node-id="7:146">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center p-[8px] relative shrink-0" data-name="state-layer" data-node-id="7:147">
          {icon || (
            <div className="relative shrink-0 size-6" data-name="Icon" data-node-id="7:148">
              <div className="absolute inset-[7.33%_8.31%_7.29%_8.33%]" data-name="icon" id="node-I7_148-51127_4769">
                <img alt="" className="block max-w-none size-full" src={settingsIconImg} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TopPage() {
  const [showMyPage, setShowMyPage] = useState(false);

  if (showMyPage) {
    return <MyPage />;
  }

  return (
    <div className="bg-white content-stretch flex flex-col gap-2 items-center justify-start relative size-full" data-name="Top Page" data-node-id="2:2">
      <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative shrink-0 w-[402px]" data-name="Status bar - iPhone" data-node-id="7:234">
        <StatusBarIPhone />
      </div>
      <PageHeader title="Show Trust" onLogoClick={() => setShowMyPage(false)} />
      {/* DID Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="DID Box" data-node-id="78:151">
        <DIDBox showSearchButton={true} />
      </div>
      {/* VC Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="VC Box" data-node-id="78:188">
        <VCBox
          icons={[
            { image: tokyoUniversityLogoImg },
            { image: driversLicenseLogoImg }
          ]}
        />
      </div>
      {/* Trust Box */}
      <div className="bg-[#cfffd7] relative shrink-0 w-[402px]" data-name="Trust Box" data-node-id="78:248">
        <TrustBox
          trustScore={66}
          activityScore={64}
          certificationLevel={80}
          communityEvaluation={54}
        />
      </div>
      {/* Activities Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="Activities Box" data-node-id="78:295">
        <div className="box-border content-stretch flex flex-col gap-[15px] h-[120px] items-start justify-center overflow-clip p-[10px] relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" id="node-I78_295-11_85">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" id="node-I78_295-11_86" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">Activities (NFTs, SBTs, ....):</p>
            </div>
            <div className="h-[41px] shrink-0 w-[210px]" id="node-I78_295-11_87" />
          </div>
          <div className="content-stretch flex gap-2 items-center justify-start overflow-clip relative shrink-0 w-full" data-name="Frame content" id="node-I78_295-11_88">
            <div className="relative shrink-0 size-10" data-name="3D Avatars / 12" id="node-I78_295-11_89">
              <Component3DAvatars12 />
            </div>
            <div className="relative shrink-0 size-10" data-name="3D Avatars / 10" id="node-I78_295-11_91">
              <Component3DAvatars10 />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      {/* SocialNetwork Box */}
      <div className="bg-[#cfffd7] h-[134px] relative shrink-0 w-[402px]" data-name="SocialNetwork Box" data-node-id="78:307">
        <SocialNetworkBox />
      </div>
      {/* Footer Box */}
      <div className="bg-[#13a229] box-border content-stretch flex gap-[26px] h-14 items-center justify-start px-[7px] py-0 relative shrink-0 w-[402px]" data-name="Footter Box" data-node-id="78:337">
        <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative shrink-0 size-12" data-name="Setting Icon button" id="node-I78_337-11_98">
          <IconButton style="standard" state="enabled" />
        </div>
        <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#080808] text-[22px] text-center text-nowrap whitespace-pre" id="node-I78_337-78_350" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="mb-0">digital identity</p>
          <p className="">management</p>
        </div>
        <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame" id="node-I78_337-11_100">
          <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-[13px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-px" data-name="Login Button" id="node-I78_337-11_101" onClick={() => setShowMyPage(true)}>
            <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I78_337-11_101-53923_27817">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I78_337-11_101-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[24px] whitespace-pre">Login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}