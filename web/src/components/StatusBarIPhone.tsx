import cellularConnectionImg from '../assets/cellular-connection.svg';
import wifiImg from '../assets/wifi.svg';
import batteryImg from '../assets/battery.svg';

interface StatusBarIPhoneProps {
  time?: string;
  size?: "iPhone 16 Pro and 16 Max" | "iPhone 16 and 16 Plus";
}

export default function StatusBarIPhone({ time = "9:41" }: StatusBarIPhoneProps) {
  return (
    <div className="box-border content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-4 relative size-full" data-name="Size=iPhone 16 Pro and 16 Max" data-node-id="7:214">
      <div className="basis-0 box-border content-stretch flex gap-2.5 grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0" data-name="Time" data-node-id="7:225">
        <div className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[0] relative shrink-0 text-[17px] text-black text-center text-nowrap" data-node-id="7:226" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px] whitespace-pre">{time}</p>
        </div>
      </div>
      <div className="basis-0 box-border content-stretch flex gap-[7px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0" data-name="Levels" data-node-id="7:227">
        <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection" data-node-id="7:228">
          <img alt="" className="block max-w-none size-full" src={cellularConnectionImg} />
        </div>
        <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi" data-node-id="7:229">
          <img alt="" className="block max-w-none size-full" src={wifiImg} />
        </div>
        <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Battery" data-node-id="7:230">
          <img alt="" className="block max-w-none size-full" src={batteryImg} />
        </div>
      </div>
    </div>
  );
}
