import logoImg from './assets/logo.png';
import tokyoUniversityLogoImg from './assets/tokyo-university-logo.png';
import driversLicenseLogoImg from './assets/drivers-license-logo.png';
import companyLogoImg from './assets/company-logo.png';
import cellularConnectionImg from './assets/cellular-connection.svg';
import wifiImg from './assets/wifi.svg';
import batteryImg from './assets/battery.svg';
import messageQuestionImg from './assets/message-question.svg';
import settingsIconImg from './assets/settings-icon.svg';
import homeIconImg from './assets/home-icon.svg';

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

export default function VerifyVc1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-2 items-center justify-start relative size-full" data-name="Verify VC1" data-node-id="27:197">
      <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative shrink-0 w-[402px]" data-name="Status bar - iPhone" data-node-id="27:198">
        <StatusBarIPhone />
      </div>
      <div className="box-border content-stretch flex gap-5 items-center justify-start px-2.5 py-0 relative shrink-0 w-[402px]" data-name="Header Box" data-node-id="78:139">
        <div aria-hidden="true" className="absolute border border-[#27c840] border-solid inset-0 pointer-events-none" />
        <div className="bg-center bg-cover bg-no-repeat shrink-0 size-20" data-name="20250905DigitalIdentityLogo1-1 2" id="node-I78_139-21_184" style={{ backgroundImage: `url('${logoImg}')` }} />
        <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[40px] min-h-px min-w-px relative shrink-0 text-[#13a229] text-[32px] text-center" id="node-I78_139-5_1116" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="mb-0">Verifiable</p>
          <p className>Credential</p>
        </div>
        <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-9" data-name="message-question" id="node-I78_139-2_1656">
          <MessageQuestion />
        </div>
      </div>
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="DID Box" data-node-id="78:175">
        <div className="box-border content-stretch flex flex-col gap-[15px] h-[120px] items-start justify-center overflow-clip p-[10px] relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" id="node-I78_175-6_237">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" id="node-I78_175-5_1121" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">DID:</p>
            </div>
            <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" id="node-I78_175-6_235" />
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Check Button" id="node-I78_175-6_204">
              <ButtonDark labelText="Resolve" style="Filled" state="enabled" showIcon="False" />
            </div>
          </div>
          <div className="h-[49px] overflow-clip relative shrink-0 w-full" data-name="Frame content" id="node-I78_175-6_236">
            <div className="absolute flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[20px] left-1/2 text-[14px] text-black text-center text-nowrap top-1/2 tracking-[0.1px] translate-x-[-50%] translate-y-[-50%] whitespace-pre" id="node-I78_175-6_245" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="mb-0">did:ethr:</p>
              <p className>0x12345678d9571F41e01Ab0C826a927df87654321</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="basis-0 bg-[#cfffd7] grow min-h-[200px] relative shrink-0 w-[400px]" data-name="VCFrame" data-node-id="27:210">
        <div className="box-border content-stretch flex flex-col gap-[15px] h-full items-center justify-start overflow-clip p-[10px] relative w-[400px]">
          <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-name="VC header" data-node-id="27:211">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="27:212" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">VC:</p>
            </div>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-4 2" data-node-id="36:765" style={{ backgroundImage: `url('${tokyoUniversityLogoImg}')` }} />
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Verify Button" data-node-id="27:207">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I27_207-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I27_207-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[24px] whitespace-pre">Verify</p>
                </div>
              </div>
            </div>
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Login Button" data-node-id="42:858">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I42_858-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I42_858-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[24px] whitespace-pre">Privacy Settings</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip relative shrink-0 w-full" data-name="VC content" data-node-id="27:214">
            <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip px-2 py-0 relative shrink-0 w-full" data-node-id="28:283">
              <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black text-nowrap tracking-[0.5px] whitespace-pre" data-node-id="28:284" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="mb-0">Issuer: xxxxxxxxxxx</p>
                <p className="mb-0">Issue date: 2025/09/15</p>
                <p className="mb-0">category: xxxxxxxxxxxx</p>
                <p className="mb-0">grade: xxxxxxxxxxxx</p>
                <p className>......</p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#cfffd7] relative shrink-0 w-[400px]" data-name="ProofFrame" data-node-id="42:862">
        <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start overflow-clip px-2.5 py-0 relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" data-node-id="42:863">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="42:864" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">Proof:</p>
            </div>
            <div className="h-11 relative shrink-0 w-[170px]" data-name="Ask queation" data-node-id="42:865">
              <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-0 overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0" data-name="Ask Question Button" data-node-id="42:866">
                <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I42_866-53923_27817">
                  <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I42_866-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[24px] whitespace-pre">Are you older than 20?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#cfffd7] relative shrink-0 w-[400px]" data-name="IssueVCFrame" data-node-id="42:849">
        <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start overflow-clip px-2.5 py-0 relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" data-node-id="42:850">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="42:851" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">other VCs:</p>
            </div>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-2 2" data-node-id="42:852" style={{ backgroundImage: `url('${driversLicenseLogoImg}')` }} />
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-10" data-name="20250905DigitalIdentityLogo1-3 1" data-node-id="42:853" style={{ backgroundImage: `url('${companyLogoImg}')` }} />
            <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" data-node-id="42:854" />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      <div className="bg-[#13a229] box-border content-stretch flex gap-[54px] h-14 items-center justify-start px-[7px] py-0 relative shrink-0 w-[402px]" data-name="Footter Box" data-node-id="78:518">
        <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative shrink-0 size-12" data-name="Setting Icon button" id="node-I78_518-11_98">
          <IconButton style="standard" state="enabled" />
        </div>
        <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Login Button" id="node-I78_518-11_144">
          <div className="box-border content-stretch flex gap-2 items-center justify-center pl-4 pr-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I78_518-11_144-53923_27801">
            <div className="relative shrink-0 size-[18px]" data-name="icon" id="node-I78_518-11_144-53923_27802">
              <div className="absolute contents inset-0" data-name="vuesax/linear/house" id="node-I78_518-11_144-53923_27802-1_42591">
                <img alt className="block max-w-none size-full" src={homeIconImg} />
              </div>
            </div>
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I78_518-11_144-53923_27803" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px] whitespace-pre">Home</p>
            </div>
          </div>
        </div>
        <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame" id="node-I78_518-11_100">
          <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-[13px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-px w-[101px]" data-name="Login Button" id="node-I78_518-11_101">
            <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I78_518-11_101-53923_27817">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I78_518-11_101-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[24px] whitespace-pre">Your page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}