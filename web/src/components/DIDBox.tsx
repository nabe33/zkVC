import { useState, useEffect } from 'react';

interface DIDBoxProps {
  label?: string;
  showSearchButton?: boolean;
  buttonVariant?: 'default' | 'filled';
}

export default function DIDBox({
  label = "DID:",
  showSearchButton = false,
  buttonVariant = 'default'
}: DIDBoxProps) {
  const [currentDID, setCurrentDID] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
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

  return (
    <div className="relative size-full" data-name="DID Box">
      <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-center p-[10px] relative size-full">
        <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0 w-full" data-name="Frame header">
          <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[28px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] whitespace-pre">{label}</p>
          </div>
          <div className="basis-0 grow h-[41px] min-h-px min-w-px shrink-0" />
          {showSearchButton && (
            <div className="bg-gray-300 box-border content-stretch cursor-not-allowed flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Search Button">
              <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-gray-500 text-[16px] text-center text-nowrap tracking-[0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[24px] whitespace-pre">Search</p>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white box-border content-stretch cursor-pointer flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Check Button" onClick={handleResolveDID}>
            <div className="box-border content-stretch flex gap-2 items-center justify-center px-6 py-2.5 relative shrink-0 w-full" data-name="state-layer">
              <div className={`flex flex-col font-['Roboto:${buttonVariant === 'filled' ? 'Medium' : 'Regular'}',_sans-serif] ${buttonVariant === 'filled' ? 'font-medium' : 'font-normal'} justify-center leading-[0] relative shrink-0 text-[#381e72] text-[${buttonVariant === 'filled' ? '14' : '16'}px] text-center text-nowrap tracking-[0.5px]`} style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[24px] whitespace-pre">{isResolving ? (buttonVariant === 'filled' ? 'Resolving...' : 'Resolving...') : 'Resolve'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-clip relative shrink-0 w-full" data-name="Frame content">
          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[20px] text-[14px] text-black text-center tracking-[0.1px] px-2 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="break-all w-full mb-1">{isLoading ? 'Loading...' : currentDID}</p>
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
  );
}
