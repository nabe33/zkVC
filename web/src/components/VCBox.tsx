interface ButtonDarkProps {
  labelText?: string;
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

interface VCIcon {
  image: string;
  onClick?: () => void;
}

interface VCBoxProps {
  icons: VCIcon[];
  showAddButton?: boolean;
}

export default function VCBox({
  icons,
  showAddButton = false
}: VCBoxProps) {
  return (
    <div className="relative size-full" data-name="VC Box">
      <div className="box-border content-stretch flex flex-col gap-[15px] h-[120px] items-start justify-center overflow-clip p-[10px] relative w-[400px]">
        <div className="content-stretch flex font-['Roboto:Regular',_sans-serif] font-normal gap-[15px] items-center justify-start leading-[0] relative shrink-0 text-black text-nowrap w-full" data-name="Frame header">
          <div className="flex flex-col justify-center relative shrink-0 text-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[36px] text-nowrap whitespace-pre">VC NFTs:</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[22px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[28px] text-nowrap whitespace-pre">{`click to view&verify`}</p>
          </div>
        </div>
        <div className="content-stretch flex gap-2 items-center justify-start overflow-clip relative shrink-0 w-full" data-name="Frame content">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`bg-center bg-cover bg-no-repeat shrink-0 size-11 ${icon.onClick ? 'cursor-pointer' : ''}`}
              data-name={`VC Icon ${index + 1}`}
              style={{ backgroundImage: `url('${icon.image}')` }}
              onClick={icon.onClick}
            />
          ))}
          {showAddButton && (
            <div className="bg-gray-300 box-border content-stretch cursor-not-allowed flex flex-col h-11 items-center justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[83px]" data-name="Add Button">
              <ButtonDark labelText="Add" />
            </div>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#13a229] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
