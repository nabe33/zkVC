import logoImg from '../assets/logo.png';
import messageQuestionImg from '../assets/message-question.svg';

function MessageQuestion() {
  return (
    <div className="relative size-full" data-name="Style=linear" data-node-id="2:1614">
      <div className="absolute contents inset-0" data-name="vuesax/linear/message-question" data-node-id="2:1620">
        <img alt="" className="block max-w-none size-full" src={messageQuestionImg} />
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string | string[];
  onLogoClick?: () => void;
}

export default function PageHeader({ title, onLogoClick }: PageHeaderProps) {
  const titleArray = Array.isArray(title) ? title : [title];

  return (
    <div className="box-border content-stretch flex gap-5 items-center justify-start px-2.5 py-0 relative shrink-0 w-[402px]" data-name="Header Box">
      <div aria-hidden="true" className="absolute border border-[#27c840] border-solid inset-0 pointer-events-none" />
      <div
        className="bg-center bg-cover bg-no-repeat cursor-pointer shrink-0 size-20"
        data-name="20250905DigitalIdentityLogo1-1 2"
        style={{ backgroundImage: `url('${logoImg}')` }}
        onClick={onLogoClick}
      />
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[40px] min-h-px min-w-px relative shrink-0 text-[#13a229] text-[32px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        {titleArray.map((line, index) => (
          <p key={index} className={index === 0 ? "mb-0" : ""}>{line}</p>
        ))}
      </div>
      <div className="relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-9" data-name="message-question">
        <MessageQuestion />
      </div>
    </div>
  );
}
