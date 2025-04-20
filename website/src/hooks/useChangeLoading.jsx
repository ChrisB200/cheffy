import { useEffect } from "react";
import { useLoading } from "./contexts";

function useChangeLoading(loading) {
  const { changeLoading } = useLoading();

  useEffect(() => {
    changeLoading(loading)
  }, [loading])
}

export default useChangeLoading;
