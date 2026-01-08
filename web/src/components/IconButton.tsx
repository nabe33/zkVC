import settingsIconImg from '../assets/settings-icon.svg';

interface IconButtonProps {
  icon?: React.ReactNode | null;
  style?: "filled" | "outlined" | "standard" | "tonal";
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
}

export default function IconButton({ icon = null }: IconButtonProps) {
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

interface ButtonDarkProps {
  icon?: React.ReactNode | null;
  labelText?: string;
  style?: "Filled" | "Outlined" | "Text" | "Elevated" | "Tonal";
  state?: "enabled" | "hovered" | "focused" | "pressed" | "disabled";
  showIcon?: "False" | "True";
}

export function ButtonDark({ labelText = "Label" }: ButtonDarkProps) {
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
