import { ErrorProps } from "../types/index";

export default function Error({ message }: ErrorProps) {
  return <div className="text-center text-red-500">Hata: {message}</div>;
}
