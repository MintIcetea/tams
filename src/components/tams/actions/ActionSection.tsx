import {
  requestFlow,
  requestForceLogin,
  requestRefresh,
} from "@/api/tams/account/actions";
import { UserTableUtilities } from "@/app/tams/page";
import LoadingButton from "@/components/common/LoadingButton";
import { ReactElement, useContext } from "react";
import toast from "react-hot-toast";

interface ActionSectionProps {
  username: string;
}

// TODO: Call refresh table from context
const ActionSection = ({
  username,
}: ActionSectionProps): ReactElement<ActionSectionProps> => {
  const { refreshData } = useContext(UserTableUtilities);

  const handleLogin = async () => {
    const loggedIn = await requestForceLogin(username);
    if (!loggedIn) {
      toast.error("Failed to login. Check log for more info");
    }

    await refreshData();
  };

  const handleFlow = async () => {
    const succeed = await requestFlow(username);
    if (!succeed) {
      toast.error("Failed to execute flow. Check log for more info");
    }

    await refreshData();
  };

  const handleRefresh = async () => {
    const succeed = await requestRefresh(username);
    if (!succeed) {
      toast.error("Failed to refresh account status. Check log for more info");
    }

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
        <LoadingButton
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
          onClick={handleFlow}
        >
          Run Flow
        </LoadingButton>
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
