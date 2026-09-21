import {
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Eye,
  HardHat,
  House,
  ShieldCheck,
  Store,
  Trash2,
  Trees,
  Truck,
  Users,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react";

export type IconKey =
  | "building"
  | "house"
  | "store"
  | "zap"
  | "droplets"
  | "hardhat"
  | "trees"
  | "trash"
  | "truck"
  | "wrench"
  | "eye"
  | "clipboard"
  | "calculator"
  | "users"
  | "shield"
  | "check";

const icons: Record<IconKey, React.ComponentType<LucideProps>> = {
  building: Building2,
  house: House,
  store: Store,
  zap: Zap,
  droplets: Droplets,
  hardhat: HardHat,
  trees: Trees,
  trash: Trash2,
  truck: Truck,
  wrench: Wrench,
  eye: Eye,
  clipboard: ClipboardList,
  calculator: Calculator,
  users: Users,
  shield: ShieldCheck,
  check: CheckCircle2,
};

interface ServiceIconProps extends LucideProps {
  name: IconKey;
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
