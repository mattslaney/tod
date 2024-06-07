import React, { useContext, useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import { PhoneContext } from "@/app/contexts/Phones";
import { PhoneStatus } from "@/app/utils/phoneUtils";

const Dialpad = () => {
  const phoneContext = useContext(PhoneContext);
  const [destination, setDestination] = useState<string>("");
  const [ringing, setRinging] = useState<Boolean>(false);

  const buttonHandler = (e: React.MouseEvent) => {
    let key = e.currentTarget.textContent || '';
    setDestination('' + destination + key);
  } 

  const handleCall = () => {
    const phone = phoneContext?.getPhone(0);
    if(phone) {
      switch (phone.status) {
        case PhoneStatus.online:
            phoneContext?.getPhone(0)?.call(destination);
          break;
        case PhoneStatus.ringing:
          phoneContext?.getPhone(0)?.answer();
          break;
        case PhoneStatus.busy:
          phoneContext?.getPhone(0)?.hangup();
          break;
        default:
          break;
      }
    }
  }

  if(typeof window !== 'undefined') {
    window.addEventListener("PhoneStatus", (e: CustomEventInit) => {
      switch(e.detail.status) {
        case "ringing":
          setRinging(true);
          break;
        default:
          setRinging(false);
          break;
      }
    });
  }

  return (
    <div className="w-32">
      <input
        className="mb-2 w-32 text-center font-bold text-slate-400 dark:bg-slate-600"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <div className="grid size-32 grid-cols-3 gap-1">
        <Button label="1" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="2" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="3" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="4" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="5" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="6" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="7" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="8" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="9" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="*" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="0" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <Button label="#" icon="" type={ButtonType.default} clickHandler={buttonHandler} />
        <span className="size-20" />
        <Button label="" icon="phone" type={ringing ? ButtonType.positive : ButtonType.neutral} clickHandler={handleCall} />
        <span className="size-20" />
      </div>
    </div>
  );
};

export default Dialpad;
