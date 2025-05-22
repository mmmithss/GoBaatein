import { Loader2Icon } from "lucide-react";
import { useStoreForTheme } from "../store/useStore";

const PageLoading = () => {
  const { theme } = useStoreForTheme();
  return (
    <div
      className=" min-h-screen flex items-center justify-center"
      data-theme={theme}
    >
      <Loader2Icon className="animate-spin size-16 text-primary " />
    </div>
  );
};

export default PageLoading;
