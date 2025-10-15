import {
  LuUser,
  LuLock,
  LuMail,
  LuSearch,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export const icons = {
  user: LuUser,
  lock: LuLock,
  mail: LuMail,
  search: LuSearch,
  eye: LuEye,
  eyeOff: LuEyeOff,
};

export type IconName = keyof typeof icons;
