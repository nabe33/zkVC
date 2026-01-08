import { useState } from 'react'
import VerifyVC from './verifyVC'
import TopPage from './topPage'
import StatusBarIPhone from './components/StatusBarIPhone'
import PageHeader from './components/PageHeader'
import DIDBox from './components/DIDBox'
import VCBox from './components/VCBox'
import TrustBox from './components/TrustBox'
import ActivitiesBox from './components/ActivitiesBox'
import SocialNetworkBox from './components/SocialNetworkBox'
import IconButton from './components/IconButton'
import avatar12Img from './assets/avatar-12.png';
import avatar10Img from './assets/avatar-10.png';
import avatar1Img from './assets/avatar-1.png';
import driversLicenseLogoImg from './assets/drivers-license-logo.png';
import tokyoUniversityLogoImg from './assets/tokyo-university-logo.png';
import companyLogoImg from './assets/company-logo.png';

interface ButtonDarkProps {
  icon?: React.ReactNode | null;
  labelText?: string;
  style?: "Filled" | "Outlined" | "Text" | "Elevated" | "Tonal";
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  showIcon?: "False" | "True";
}

function ButtonDark({ labelText = "Label" }: ButtonDarkProps) {
  return (
    <div className="content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] size-full" data-name="Style=Filled, State=enabled, Show Icon=False" data-node-id="6:78">
      <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" data-node-id="6:202">
        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#381e72] text-[14px] text-center text-nowrap tracking-[0.1px]" data-node-id="6:203" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[20px] whitespace-pre">{labelText}</p>
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  const [showVerifyVC, setShowVerifyVC] = useState(false);
  const [showTopPage, setShowTopPage] = useState(false);

  if (showVerifyVC) {
    return <VerifyVC />;
  }

  if (showTopPage) {
    return <TopPage />;
  }

  return (
    <div className="bg-white content-stretch flex flex-col gap-2 items-center justify-start relative size-full" data-name="MyPage" data-node-id="11:50">
      <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative shrink-0 w-[402px]" data-name="Status bar - iPhone" data-node-id="11:51">
        <StatusBarIPhone />
      </div>
      <PageHeader title="My Trust" onLogoClick={() => setShowTopPage(true)} />
      {/* MyDID Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="DID Box" data-node-id="78:163">
        <DIDBox label="My DID:" buttonVariant="filled" />
      </div>
      {/* VC Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="VC Box" data-node-id="78:225">
        <VCBox
          icons={[
            { image: tokyoUniversityLogoImg },
            { image: driversLicenseLogoImg, onClick: () => setShowVerifyVC(true) },
            { image: companyLogoImg }
          ]}
          showAddButton={true}
        />
      </div>
      {/* Trust Box */}
      <div className="bg-[#cfffd7] relative shrink-0 w-[402px]" data-name="Trust Box" data-node-id="78:259">
        <TrustBox
          trustScore={88}
          activityScore={86}
          certificationLevel={90}
          communityEvaluation={88}
        />
      </div>
      {/* Activities Box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="Activities Box" data-node-id="78:271">
        <ActivitiesBox avatarImages={[avatar12Img, avatar10Img, avatar1Img]} />
      </div>
      {/* SocialNetwork Box */}
      <div className="bg-[#cfffd7] h-[134px] relative shrink-0 w-[402px]" data-name="SocialNetwork Box" data-node-id="78:315">
        <SocialNetworkBox isDetailButtonEnabled={false} />
      </div>
      {/* Footter Box */}
      <div className="bg-[#13a229] box-border content-stretch flex gap-[26px] h-14 items-center justify-start px-[7px] py-0 relative shrink-0 w-[402px]" data-name="Footter Box" data-node-id="78:324">
        <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative shrink-0 size-12" data-name="Setting Icon button" id="node-I78_324-11_98">
          <IconButton style="standard" state="enabled" />
        </div>
        <div className="bg-gray-300 box-border content-stretch cursor-not-allowed flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Login Button" id="node-I78_324-11_144">
          <ButtonDark labelText="Privacy Settings" style="Filled" state="disabled" showIcon="False" />
        </div>
        <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame" id="node-I78_324-11_100">
          <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-[13px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-px" data-name="Login Button" id="node-I78_324-11_101" onClick={() => setShowTopPage(true)}>
            <ButtonDark labelText="Logout" style="Filled" state="enabled" showIcon="False" />
          </div>
        </div>
      </div>
    </div>
  );
}