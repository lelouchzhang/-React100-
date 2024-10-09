import { useSearchParams } from "react-router-dom";

// 接收url中的querys，通过useSearchParams钩子
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
