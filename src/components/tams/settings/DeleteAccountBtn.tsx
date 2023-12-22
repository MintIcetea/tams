import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "../../common/Button";
import { ReactElement, useCallback, useRef } from "react";

interface DeleteAccountButtonProps {
  username: string;
}

const DeleteAccountButton = ({
  username,
}: DeleteAccountButtonProps): ReactElement<DeleteAccountButtonProps> => {
  const deleteFormRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(() => {
    if (deleteFormRef?.current == null) {
      return;
    }

    deleteFormRef.current.setAttribute("data-state", "closed");
  }, []);

  const handleDeleteAccount = () => {
    // TODO: Integrate with API here
    console.log(username);
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
                className="bg-red-400 hover:bg-red-500 text-white"
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
