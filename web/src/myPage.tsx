import { useState, useEffect } from 'react'
import VerifyVC from './verifyVC'
import TopPage from './topPage'
import avatar12Img from './assets/avatar-12.png';
import avatar10Img from './assets/avatar-10.png';
import avatar1Img from './assets/avatar-1.png';
import logoImg from './assets/logo.png';
import driversLicenseLogoImg from './assets/drivers-license-logo.png';
import tokyoUniversityLogoImg from './assets/tokyo-university-logo.png';
import companyLogoImg from './assets/company-logo.png';
import cellularConnectionImg from './assets/cellular-connection.svg';
import wifiImg from './assets/wifi.svg';
import batteryImg from './assets/battery.svg';
import messageQuestionImg from './assets/message-question.svg';
import settingsIconImg from './assets/settings-icon.svg';

interface StatusBarIPhoneProps {
  time?: string;
  size?: "iPhone 16 Pro and 16 Max" | "iPhone 16 and 16 Plus";
}

function StatusBarIPhone({ time = "9:41", size = "iPhone 16 Pro and 16 Max" }: StatusBarIPhoneProps) {
  return (
    <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative size-full" data-name="Size=iPhone 16 Pro and 16 Max" data-node-id="7:214">
      <div className="basis-0 box-border content-stretch flex gap-2.5 grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0" data-name="Time" data-node-id="7:225">
        <div className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[0] relative shrink-0 text-[17px] text-black text-center text-nowrap" data-node-id="7:226" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px] whitespace-pre">{time}</p>
        </div>
      </div>
      <div className="basis-0 box-border content-stretch flex gap-[7px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0" data-name="Levels" data-node-id="7:227">
        <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection" data-node-id="7:228">
          <img alt className="block max-w-none size-full" src={cellularConnectionImg} />
        </div>
        <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi" data-node-id="7:229">
          <img alt className="block max-w-none size-full" src={wifiImg} />
        </div>
        <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Battery" data-node-id="7:230">
          <img alt className="block max-w-none size-full" src={batteryImg} />
        </div>
      </div>
    </div>
  );
}

interface MessageQuestionProps {
  style?: "bold" | "broken" | "bulk" | "linear" | "outline" | "twotone";
}

function MessageQuestion({ style = "linear" }: MessageQuestionProps) {
  return (
    <div className="relative size-full" data-name="Style=linear" data-node-id="2:1614">
      <div className="absolute contents inset-0" data-name="vuesax/linear/message-question" data-node-id="2:1620">
        <img alt className="block max-w-none size-full" src={messageQuestionImg} />
      </div>
    </div>
  );
}

interface ButtonDarkProps {
  icon?: React.ReactNode | null;
  labelText?: string;
  style?: "Filled" | "Outlined" | "Text" | "Elevated" | "Tonal";
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  showIcon?: "False" | "True";
}

function ButtonDark({ icon = null, labelText = "Label", style = "Tonal", state = "disabled", showIcon = "True" }: ButtonDarkProps) {
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

function ActivitiesBox() {
  return (
    <div className="relative size-full" data-name="Activities Box" data-node-id="78:270">
      <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-center p-[10px] relative size-full">
        <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" data-node-id="11:85">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="11:86" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">Activities (NFTs, SBTs, ....):</p>
          </div>
          <div className="h-[41px] shrink-0 w-[210px]" data-node-id="11:87" />
        </div>
        <div className="content-stretch flex gap-2 items-center justify-start overflow-clip relative shrink-0 w-full" data-name="Frame content" data-node-id="11:88">
          <div className="relative shrink-0 size-10" data-name="3D Avatars / 12" data-node-id="11:89">
            <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="Avatars / 3d_avatar_12" id="node-I11_89-52767_23897" style={{ backgroundImage: `url('${avatar12Img}')` }} />
          </div>
          <div className="relative shrink-0 size-10" data-name="3D Avatars / 10" data-node-id="11:91">
            <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="Avatars / 3d_avatar_10" id="node-I11_91-52767_23895" style={{ backgroundImage: `url('${avatar10Img}')` }} />
          </div>
          <div className="relative shrink-0 size-10" data-name="3D Avatars / 1" data-node-id="11:92">
            <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="Avatars / 3d_avatar_1" id="node-I11_92-52767_23886" style={{ backgroundImage: `url('${avatar1Img}')` }} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

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
            <div className="absolute bg-gray-300 box-border content-stretch cursor-not-allowed flex flex-col items-center justify-center left-[17px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0" data-name="Login Button" data-node-id="11:156">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I11_156-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-gray-500 text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I11_156-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
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

function IconButton({ icon = null, style = "outlined", state = "disabled" }: IconButtonProps) {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative size-full" data-name="Style=standard, State=enabled" data-node-id="7:88">
      <div className="content-stretch flex gap-2.5 items-center justify-center overflow-clip relative rounded-[100px] shrink-0" data-name="container" data-node-id="7:146">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center p-[8px] relative shrink-0" data-name="state-layer" data-node-id="7:147">
          {icon || (
            <div className="relative shrink-0 size-6" data-name="Icon" data-node-id="7:148">
              <div className="absolute inset-[7.33%_8.31%_7.29%_8.33%]" data-name="icon" id="node-I7_148-51127_4769">
                <img alt className="block max-w-none size-full" src={settingsIconImg} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  const [showVerifyVC, setShowVerifyVC] = useState(false);
  const [showTopPage, setShowTopPage] = useState(false);
  const [currentDID, setCurrentDID] = useState<string>('Loading...');
  const [isLoadingDID, setIsLoadingDID] = useState(true);
  const [isResolving, setIsResolving] = useState(false);
  const [resolveStatus, setResolveStatus] = useState<string | null>(null);
  const [isResolveError, setIsResolveError] = useState(false);

  useEffect(() => {
    const fetchDID = async () => {
      try {
        const response = await fetch('http://localhost:3001/getCurrentDID');
        const data = await response.json();
        setCurrentDID(data.did || 'DID not found');
      } catch (error) {
        console.error('Error fetching DID:', error);
        setCurrentDID('Error loading DID');
      } finally {
        setIsLoadingDID(false);
      }
    };

    fetchDID();
  }, []);

  const handleResolveDID = async () => {
    setIsResolving(true);
    setResolveStatus(null);
    try {
      const response = await fetch('http://localhost:3001/resolveDID');
      if (response.ok) {
        setResolveStatus('Resolve Success');
        setIsResolveError(false);
      } else {
        throw new Error('Resolve failed');
      }
    } catch (error) {
      console.error('Error resolving DID:', error);
      setResolveStatus('Resolve Failed');
      setIsResolveError(true);
    } finally {
      setIsResolving(false);
    }
  };

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
      <div className="box-border content-stretch flex gap-5 items-center justify-start px-2.5 py-0 relative shrink-0 w-[402px]" data-name="Header Box" data-node-id="78:129">
        <div aria-hidden="true" className="absolute border border-[#27c840] border-solid inset-0 pointer-events-none" />
        <div className="bg-center bg-cover bg-no-repeat cursor-pointer shrink-0 size-20" data-name="20250905DigitalIdentityLogo1-1 2" id="node-I78_129-21_184" style={{ backgroundImage: `url('${logoImg}')` }} onClick={() => setShowTopPage(true)} />
        <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#13a229] text-[32px] text-center" id="node-I78_129-5_1116" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[40px]">My Trust</p>
        </div>
        <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-9" data-name="message-question" id="node-I78_129-2_1656">
          <MessageQuestion />
        </div>
      </div>
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="DID Box" data-node-id="78:163">
        <div className="box-border content-stretch flex flex-col gap-[15px] h-[120px] items-start justify-center overflow-clip p-[10px] relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" id="node-I78_163-6_237">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" id="node-I78_163-5_1121" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">My DID:</p>
            </div>
            <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" id="node-I78_163-6_235" />
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Check Button" id="node-I78_163-6_204" onClick={handleResolveDID}>
              <ButtonDark labelText={isResolving ? "Resolving..." : "Resolve"} style="Filled" state="enabled" showIcon="False" />
            </div>
          </div>
          <div className="flex-1 overflow-clip relative shrink-0 w-full" data-name="Frame content" id="node-I78_163-6_236">
            <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[20px] text-[14px] text-black text-center tracking-[0.1px] px-2 w-full" id="node-I78_163-6_245" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="break-all w-full mb-1">{isLoadingDID ? 'Loading...' : currentDID}</p>
              {resolveStatus && (
                <p className={`text-sm font-medium ${isResolveError ? 'text-red-600' : 'text-green-600'}`}>
                  {resolveStatus}
                </p>
              )}
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="VC Box" data-node-id="78:225">
        <div className="box-border content-stretch flex flex-col gap-[15px] h-[120px] items-start justify-center overflow-clip p-[10px] relative w-[400px]">
          <div className="content-stretch flex font-['Roboto:Regular',_sans-serif] font-normal gap-[15px] items-center justify-start leading-[0] relative shrink-0 text-black text-nowrap w-full" data-name="Frame header" id="node-I78_225-6_247">
            <div className="flex flex-col justify-center relative shrink-0 text-[28px]" id="node-I78_225-6_248" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] text-nowrap whitespace-pre">VC NFTs:</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[22px] text-center" id="node-I78_225-18_181" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[28px] text-nowrap whitespace-pre">{`click to view&verify`}</p>
            </div>
          </div>
          <div className="content-stretch flex gap-2 items-center justify-start overflow-clip relative shrink-0 w-full" data-name="Frame content" id="node-I78_225-6_252">
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-2 1" id="node-I78_225-7_200" style={{ backgroundImage: `url('${driversLicenseLogoImg}')` }} />
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11 cursor-pointer" data-name="20250905DigitalIdentityLogo1-4 1" id="node-I78_225-31_306" style={{ backgroundImage: `url('${tokyoUniversityLogoImg}')` }} onClick={() => setShowVerifyVC(true)} />
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-3 1" id="node-I78_225-78_197" style={{ backgroundImage: `url('${companyLogoImg}')` }} />
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col h-11 items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[83px]" data-name="Add Button" id="node-I78_225-78_215">
              <ButtonDark labelText="Add" style="Filled" state="enabled" showIcon="False" />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#cfffd7] relative shrink-0 w-[402px]" data-name="Trust Box" data-node-id="78:259">
        <div className="box-border content-stretch flex items-center justify-between overflow-clip px-2 py-0 relative w-[402px]">
          <div className="basis-0 box-border content-stretch flex flex-col gap-[15px] grow h-[126px] items-start justify-start min-h-px min-w-px px-[5px] py-2.5 relative shrink-0" data-name="Score Frame" id="node-I78_259-7_44">
            <div aria-hidden="true" className="absolute border border-[#4d4a4a] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" id="node-I78_259-7_45" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">Trust:</p>
            </div>
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#fc0707] text-[28px] text-center" id="node-I78_259-7_50" style={{ width: "min-content", fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px]">88%</p>
            </div>
          </div>
          <div className="box-border content-stretch flex flex-col gap-1 items-center justify-start overflow-clip p-[10px] relative shrink-0 w-[300px]" data-name="Score Details" id="node-I78_259-7_51">
            <div className="h-7 left-[-1px] overflow-clip w-[300px]" id="node-I78_259-7_177">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" id="node-I78_259-7_180" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[22px] whitespace-pre">{`Activity Score: 86 `}</p>
              </div>
            </div>
            <div className="h-7 left-[-1px] overflow-clip w-[300px]" id="node-I78_259-7_178">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" id="node-I78_259-7_181" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[22px] whitespace-pre">{`Certification level:  90`}</p>
              </div>
            </div>
            <div className="h-7 left-0 overflow-clip w-[300px]" id="node-I78_259-7_179">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-4 text-[18px] text-black text-nowrap" id="node-I78_259-7_182" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[22px] whitespace-pre">Community Evaluation: 88</p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="Activities Box" data-node-id="78:271">
        <ActivitiesBox />
      </div>
      <div className="bg-[#cfffd7] h-[134px] relative shrink-0 w-[402px]" data-name="SocialNetwork Box" data-node-id="78:315">
        <SocialNetworkBox />
      </div>
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