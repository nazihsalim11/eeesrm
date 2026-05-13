import type { Subject } from "@/types";
import unit1 from "./unit1";
import unit2 from "./unit2";
import unit3 from "./unit3";
import unit4 from "./unit4";
import unit5 from "./unit5";

export const subject: Subject = {
  id: "beee",
  title: "Basic Electrical and Electronics Engineering",
  code: "21EES101T",
  units: [unit1, unit2, unit3, unit4, unit5],
};

export { unit1, unit2, unit3, unit4, unit5 };
