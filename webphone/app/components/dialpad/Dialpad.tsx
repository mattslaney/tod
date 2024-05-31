import React, { useState } from "react";
import Button, { ButtonType } from "./Button";

const Dialpad = () => {
  const [destination, setDestination] = useState<string>("");

  

  return (
    <div className="w-32">
      <input
        className="mb-2 w-32 text-center font-bold text-slate-400 dark:bg-slate-600"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <div className="grid size-32 grid-cols-3 gap-1">
        <Button label="1" icon="" type={ButtonType.default} />
        <Button label="2" icon="" type={ButtonType.default} />
        <Button label="3" icon="" type={ButtonType.default} />
        <Button label="4" icon="" type={ButtonType.default} />
        <Button label="5" icon="" type={ButtonType.default} />
        <Button label="6" icon="" type={ButtonType.default} />
        <Button label="7" icon="" type={ButtonType.default} />
        <Button label="8" icon="" type={ButtonType.default} />
        <Button label="9" icon="" type={ButtonType.default} />
        <Button label="*" icon="" type={ButtonType.default} />
        <Button label="0" icon="" type={ButtonType.default} />
        <Button label="#" icon="" type={ButtonType.default} />
        <span className="size-20" />
        <Button label="" icon="phone" type={ButtonType.positive} />
        <span className="size-20" />
      </div>
    </div>
  );
};

export default Dialpad;
