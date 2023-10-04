import { IoIosBasketball } from "react-icons/io";
import { TbShirtSport } from "react-icons/tb";
import { FaPersonSwimming } from "react-icons/fa6";
import { GiRunningShoe } from "react-icons/gi";
import { BiTennisBall, BiFootball } from "react-icons/bi";

export const getSportIcon = (sport: string): React.ReactNode => {
  const icons: { [key: string]: React.ComponentType } = {
    basketball: IoIosBasketball,
    swimming: FaPersonSwimming,
    running: GiRunningShoe,
    tennis: BiTennisBall,
    football: BiFootball
  };

  const SportIcon = icons[sport.toLowerCase()];

  return SportIcon ? <SportIcon /> : <TbShirtSport />;
};