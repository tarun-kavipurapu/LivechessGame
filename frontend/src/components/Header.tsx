import React from "react";
import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 fixed right-[5vw] top-5 flex-1 md:right-5">
      <ModeToggle />
    </div>
  );
};

export default Header;
