import { useState, useEffect } from 'react'
import TopPage from './topPage';
import MyPage from './myPage';
import StatusBarIPhone from './components/StatusBarIPhone';
import PageHeader from './components/PageHeader';
import DIDBox from './components/DIDBox';
import IconButton from './components/IconButton';
import tokyoUniversityLogoImg from './assets/tokyo-university-logo.png';
import driversLicenseLogoImg from './assets/drivers-license-logo.png';
import companyLogoImg from './assets/company-logo.png';
import homeIconImg from './assets/home-icon.svg';

export default function VerifyVc1() {
  const [showTopPage, setShowTopPage] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);
  const [vcData, setVcData] = useState<any>(null);
  const [isLoadingVC, setIsLoadingVC] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
  const [isVerifyError, setIsVerifyError] = useState(false);
  const [isVerifyingAge, setIsVerifyingAge] = useState(false);
  const [ageVerifyStatus, setAgeVerifyStatus] = useState<string | null>(null);
  const [isAgeVerifyError, setIsAgeVerifyError] = useState(false);

  useEffect(() => {
    const fetchVC = async () => {
      try {
        // まずVCファイルをコピー
        console.log('Copying VC file...');
        const copyResponse = await fetch('http://localhost:3001/copyVcFile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (copyResponse.ok) {
          const copyResult = await copyResponse.json();
          console.log('Copy result:', copyResult);
        } else {
          console.warn('Failed to copy VC file, trying to fetch existing one');
        }

        // 少し待ってからVCデータを取得
        await new Promise(resolve => setTimeout(resolve, 100));

        const response = await fetch('/vc.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched VC data:', data); // デバッグ用ログ
        setVcData(data);
      } catch (error) {
        console.error('Error fetching VC data:', error);
        setVcData(null);
      } finally {
        setIsLoadingVC(false);
      }
    };

    fetchVC();
  }, []);

  const handleVerifyVC = async () => {
    if (!vcData) {
      setVerifyStatus('Verify Failed');
      setIsVerifyError(true);
      return;
    }

    setIsVerifying(true);
    setVerifyStatus(null);
    try {
      const response = await fetch('http://localhost:3001/verifyJsonVc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vcJson: vcData,
        }),
      });

      if (response.ok) {
        const isValid = await response.json();
        if (isValid) {
          setVerifyStatus('Verify Success');
          setIsVerifyError(false);
        } else {
          setVerifyStatus('Verify Failed');
          setIsVerifyError(true);
        }
      } else {
        throw new Error('Verify request failed');
      }
    } catch (error) {
      console.error('Error verifying VC:', error);
      setVerifyStatus('Verify Failed');
      setIsVerifyError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAgeVerification = async () => {
    setIsVerifyingAge(true);
    setAgeVerifyStatus(null);
    try {
      const response = await fetch('http://localhost:3001/verifyAge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Age verification result:', result);
        if (result.success) {
          setAgeVerifyStatus('Yes');
          setIsAgeVerifyError(false);
        } else {
          setAgeVerifyStatus('No');
          setIsAgeVerifyError(true);
        }
      } else {
        throw new Error('Age verification request failed');
      }
    } catch (error) {
      console.error('Error verifying age:', error);
      setAgeVerifyStatus('No');
      setIsAgeVerifyError(true);
    } finally {
      setIsVerifyingAge(false);
    }
  };

  if (showTopPage) {
    return <TopPage />;
  }

  if (showMyPage) {
    return <MyPage />;
  }

  return (
    <div className="bg-white content-stretch flex flex-col gap-2 items-center justify-start relative size-full" data-name="Verify VC1" data-node-id="27:197">
      <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative shrink-0 w-[402px]" data-name="Status bar - iPhone" data-node-id="27:198">
        <StatusBarIPhone />
      </div>
      <PageHeader title={["Verifiable", "Credential"]} onLogoClick={() => setShowTopPage(true)} />
      {/* DID box */}
      <div className="bg-[#cfffd7] h-[120px] relative shrink-0 w-[400px]" data-name="DID Box" data-node-id="78:175">
        <DIDBox buttonVariant="filled" />
      </div>
      {/* VC box */}
      <div className="bg-[#cfffd7] min-h-[200px] relative w-[400px]" data-name="VCFrame" data-node-id="27:210">
        <div className="box-border content-stretch flex flex-col gap-[15px] items-center justify-start p-[10px] relative w-[400px]">
          <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-name="VC header" data-node-id="27:211">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="27:212" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">VC:</p>
            </div>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-4 2" data-node-id="36:765" style={{ backgroundImage: `url('${driversLicenseLogoImg}')` }} />
            <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Verify Button" data-node-id="27:207" onClick={handleVerifyVC}>
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I27_207-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I27_207-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[24px] whitespace-pre">{isVerifying ? 'Verifying...' : 'Verify'}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 box-border content-stretch cursor-not-allowed flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Login Button" data-node-id="42:858">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I42_858-53923_27817">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-gray-500 text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I42_858-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[24px] whitespace-pre">Privacy Settings</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-2.5 items-start justify-start relative w-full" data-name="VC content" data-node-id="27:214">
            <div className="box-border content-stretch flex gap-2.5 items-start justify-start px-2 py-0 relative w-full" data-name="28:283">
              <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black tracking-[0.5px] text-left w-full" data-node-id="28:284" style={{ fontVariationSettings: "'wdth' 100" }}>
                {isLoadingVC ? (
                  <p>Loading VC data...</p>
                ) : vcData ? (
                  <>
                    <p className="mb-1 break-all"><span className="font-bold">type:</span> {vcData.type ? vcData.type.join(', ') : 'N/A'}</p>
                    <p className="mb-1 break-all"><span className="font-bold">issuanceDate:</span> {vcData.issuanceDate ? new Date(vcData.issuanceDate).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : 'N/A'}</p>
                    <p className="mb-1 break-all"><span className="font-bold">driverName:</span> {vcData.credentialSubject?.driverLicense?.driverName || 'N/A'}</p>
                    <p className="mb-1 break-all"><span className="font-bold">licenseType:</span> {vcData.credentialSubject?.driverLicense?.licenseType || 'N/A'}</p>
                    {verifyStatus && (
                      <div className={`mt-3 p-2 rounded border-2 ${isVerifyError ? 'text-red-600 bg-red-50 border-red-300' : 'text-green-600 bg-green-50 border-green-300'}`}>
                        <p className="text-sm font-bold">
                          {verifyStatus}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p>No VC data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      {/* Proof box */}
      <div className="bg-[#cfffd7] relative w-[400px]" data-name="ProofFrame" data-node-id="42:862">
        <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start px-2.5 py-2 relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" data-node-id="42:863">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="42:864" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">Proof:</p>
            </div>
            {/* Age verification button */}
            <div className="h-11 relative shrink-0 w-[170px]" data-name="Ask queation" data-node-id="42:865">
              <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-0 overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0" data-name="Ask Question Button" data-node-id="42:866" onClick={handleAgeVerification}>
                <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I42_866-53923_27817">
                  <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I42_866-53923_27818" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[24px] whitespace-pre">{isVerifyingAge ? 'Verifying...' : 'Are you older than 20?'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {ageVerifyStatus && (
            <div className="content-stretch flex flex-col items-start justify-start relative w-full px-2">
              <div className={`mt-2 p-2 rounded border-2 w-full ${isAgeVerifyError ? 'text-red-600 bg-red-50 border-red-300' : 'text-green-600 bg-green-50 border-green-300'}`}>
                <p className="text-sm font-bold">
                  {ageVerifyStatus}
                </p>
              </div>
            </div>
          )}
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      {/* Other VCs box */}
      <div className="bg-[#cfffd7] relative shrink-0 w-[400px]" data-name="IssueVCFrame" data-node-id="42:849">
        <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start overflow-clip px-2.5 py-0 relative w-[400px]">
          <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header" data-node-id="42:850">
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" data-node-id="42:851" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[36px] whitespace-pre">other VCs:</p>
            </div>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-11" data-name="20250905DigitalIdentityLogo1-2 2" data-node-id="42:852" style={{ backgroundImage: `url('${tokyoUniversityLogoImg}')` }} />
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-10" data-name="20250905DigitalIdentityLogo1-3 1" data-node-id="42:853" style={{ backgroundImage: `url('${companyLogoImg}')` }} />
            <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" data-node-id="42:854" />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
      </div>
      {/* Footer box */}
      <div className="bg-[#13a229] box-border content-stretch flex gap-[54px] h-14 items-center justify-start px-[7px] py-0 relative shrink-0 w-[402px]" data-name="Footter Box" data-node-id="78:518">
        <div className="content-stretch cursor-pointer flex flex-col gap-2.5 items-center justify-center relative shrink-0 size-12" data-name="Setting Icon button" id="node-I78_518-11_98">
          <IconButton style="standard" state="enabled" />
        </div>
        <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Login Button" id="node-I78_518-11_144" onClick={() => setShowTopPage(true)}>
          <div className="box-border content-stretch flex gap-2 items-center justify-center pl-4 pr-6 py-2.5 relative shrink-0 w-full" data-name="state-layer" id="node-I78_518-11_144-53923_27801">
            <div className="relative shrink-0 size-[18px]" data-name="icon" id="node-I78_518-11_144-53923_27802">
              <div className="absolute contents inset-0" data-name="vuesax/linear/house" id="node-I78_518-11_144-53923_27802-1_42591">
                <img alt="" className="block max-w-none size-full" src={homeIconImg} />
              </div>
            </div>
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#381e72] text-[16px] text-center text-nowrap tracking-[0.5px]" id="node-I78_518-11_144-53923_27803" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px] whitespace-pre">Home</p>
            </div>
          </div>
        </div>
        <div className="h-12 overflow-clip relative shrink-0 w-[123px]" data-name="LoginFrame" id="node-I78_518-11_100">
          <div className="absolute bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center left-[13px] overflow-clip rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-px w-[101px]" data-name="Login Button" id="node-I78_518-11_101" onClick={() => setShowMyPage(true)}>
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