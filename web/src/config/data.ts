import { CheckCircle, XCircle, Timer } from "lucide-react";

export const statuses = [
  {
    value: "processing",
    label: "Processing",
    icon: Timer,
  },
  {
    value: "success",
    label: "Success",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];
