import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "../../common/Button";
import { ReactElement, useCallback, useContext, useRef } from "react";
import { requestDeleteAccount } from "@/api/tams/account/account";
import toast from "react-hot-toast";
import { UserTableUtilities } from "@/app/tams/page";

interface DeleteAccountButtonProps {
  username: string;
}

const DeleteAccountButton = ({
  username,
}: DeleteAccountButtonProps): ReactElement<DeleteAccountButtonProps> => {
  const deleteFormRef = useRef<HTMLDivElement>(null);
  const { refreshData } = useContext(UserTableUtilities);

  const handleOverlayClick = useCallback(() => {
    if (deleteFormRef?.current == null) {
      return;
    }

    deleteFormRef.current.setAttribute("data-state", "closed");
  }, []);

  const handleDeleteAccount = async () => {
    toast("Deleting account...", { icon: "⏳" });

    const succeed = await requestDeleteAccount(username);
    if (!succeed) {
      toast.error("Faild to delete account. Check log for more info");
      return;
    }

    toast.success("Delete account successfully");
    refreshData();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="bg-red-400 hover:bg-red-500 text-white">
          Delete account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="AlertDialogOverlay"
          ref={deleteFormRef}
          onClick={handleOverlayClick}
        />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="text-2xl mb-4">
            Delete account
          </AlertDialog.Title>
          <AlertDialog.Description className="my-4">
            This action cannot be undone. This will permanently delete this
            account and remove the data from our servers.
          </AlertDialog.Description>
          <div className="w-full flex items-center justify-end space-x-2 text-sm">
            <AlertDialog.Cancel>
              <Button className="bg-gray-300">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                className="bg-red-400 hover:bg-red-500 text-white disabled:bg-gray-300 disabled:hover:bg-gray-300"
                onClick={handleDeleteAccount}
              >
                Yes, delete account
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteAccountButton;
