import { requestForceLogin, requestRefresh } from "@/api/tams/account/actions";
import LoadingButton from "@/components/common/LoadingButton";
import { ReactElement, useContext } from "react";
import toast from "react-hot-toast";
import { UserTableUtilities } from "../table/UtilityContext";
import FlowButton from "./FlowBtn";
import { AccountStatus } from "@/utils/app.type";

interface ActionSectionProps {
  username: string;
  status: AccountStatus;
}

const ActionSection = ({
  username,
  status,
}: ActionSectionProps): ReactElement<ActionSectionProps> => {
  const { refreshData } = useContext(UserTableUtilities);

  const handleLogin = async () => {
    toast("Logging in...", { icon: "⏳" });

    const loggedIn = await requestForceLogin(username);
    if (!loggedIn) {
      toast.error("Failed to login. Check log for more info");
      return;
    }

    toast.success("Login successfully");
    await refreshData();
  };

  const handleRefresh = async () => {
    toast("Refreshing accounts' status...", { icon: "⏳" });
    const succeed = await requestRefresh(username);
    if (!succeed) {
      toast.error("Failed to refresh account status. Check log for more info");
      return;
    }

    toast.success("Accounts' status refreshed");
    await refreshData();
  };

  return (
    <div className="w-full">
      <div className="font-semibold">Actions</div>
      <div className="mt-2 flex items-center justify-start space-x-4">
        <LoadingButton
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
          onClick={handleLogin}
        >
          Login
        </LoadingButton>
        <FlowButton username={username} status={status} />
        <LoadingButton
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
          onClick={handleRefresh}
        >
          Refresh
        </LoadingButton>
      </div>
    </div>
  );
};

export default ActionSection;
