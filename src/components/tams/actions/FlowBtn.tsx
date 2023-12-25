import { requestFlow } from "@/api/tams/account/actions";
import { ReactElement, useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { UserTableUtilities } from "../table/UtilityContext";
import { AccountStatus } from "@/utils/app.type";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "@/components/common/Button";
import ErrorText from "@/components/common/ErrorText";
import { useToggle } from "@/utils/hooks/useToggle";
import { useForm } from "react-hook-form";

interface FlowButtonProps {
  username: string;
  status: AccountStatus;
}

interface FlowFormData {
  input: string;
}

const FlowButton = ({
  username,
  status,
}: FlowButtonProps): ReactElement<FlowButtonProps> => {
  const { refreshData } = useContext(UserTableUtilities);
  const {
    isOpen: isEditFormOpen,
    open: openFlowForm,
    close: closeFlowForm,
  } = useToggle();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FlowFormData>({
    defaultValues: {
      input: "",
    },
  });

  const handleFlow = useCallback(async () => {
    toast("Executing pre-defiend flow...", { icon: "⏳" });

    const succeed = await requestFlow(username);
    if (!succeed) {
      toast.error("Failed to execute flow. Check log for more info");
      return;
    }

    toast.success("Execution done");
    await refreshData();
  }, [username]);

  const requestInputTitle = useMemo(() => {
    switch (status) {
      case "waiting-for-confirmation-code":
        return "Confirmation code";
      case "waiting-for-email":
        return "Email";
    }

    return "Email";
  }, [status]);

  const handleOpenForm = useCallback(async () => {
    if (status === "logged-in") {
      await handleFlow();
      return;
    }

    openFlowForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, handleFlow]);

  const handleCloseForm = useCallback(() => {
    reset();
    closeFlowForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFlowRequest = async (data: FlowFormData) => {
    const { input } = data;

    toast("Executing pre-defiend flow...", { icon: "⏳" });

    const succeed = await requestFlow(username, input);
    if (!succeed) {
      toast.error("Failed to execute flow. Check log for more info");
      return;
    }

    toast.success("Execution done");
    await refreshData();
  };

  return (
    <AlertDialog.Root open={isEditFormOpen}>
      <AlertDialog.Trigger>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-slate-300 disabled:hover:bg-slate-3"
          onClick={handleOpenForm}
          disabled={status === "errored" || status === "loaded"}
        >
          Run flow
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="AlertDialogOverlay"
          onClick={handleCloseForm}
        />
        <form onSubmit={handleSubmit(handleFlowRequest)}>
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="text-2xl mb-4">
              {requestInputTitle}
            </AlertDialog.Title>
            <AlertDialog.Description className="my-2 w-full" asChild>
              <div className="space-y-1 flex flex-col items-start">
                <label htmlFor="input">{requestInputTitle}</label>
                <input
                  id="input"
                  {...register("input", {
                    required: `${requestInputTitle} is required`,
                  })}
                  className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                />
                {errors?.input?.type === "required" && (
                  <ErrorText>{errors.input.message}</ErrorText>
                )}
              </div>
            </AlertDialog.Description>
            <div className="w-full flex items-center justify-end space-x-2 text-sm">
              <AlertDialog.Cancel>
                <Button className="bg-gray-300" onClick={handleCloseForm}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action type="submit">
                <Button className="bg-blue-400 hover:bg-blue-500 text-white disabled:bg-gray-300 disabled:hover:bg-gray-300">
                  Execute flow
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </form>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default FlowButton;
