import { requestAddAccount } from "@/api/tams/account/account";
import { AddAccountPayload } from "@/api/tams/account/type";
import { UserTableUtilities } from "@/app/tams/page";
import Button from "@/components/common/Button";
import ErrorText from "@/components/common/ErrorText";
import { useToggle } from "@/utils/hooks/useToggle";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactElement, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddAccountButtonProps {
  refreshData: () => Promise<void>;
}

interface AddAccountFormData {
  username: string;
  password: string;
  email: string;
  emailPassword: string;
  cookies: string;
  autoConfirmCode: boolean;
  tryLogin: boolean;
}

const AddAccountButton = ({
  refreshData,
}: AddAccountButtonProps): ReactElement<AddAccountButtonProps> => {
  const {
    isOpen: isEditFormOpen,
    open: openEditForm,
    close: closeEditForm,
  } = useToggle();

  const handleCloseForm = useCallback(() => {
    reset();
    closeEditForm();
  }, []);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAccountFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      emailPassword: "",
      cookies: "",
      autoConfirmCode: false,
      tryLogin: false,
    },
  });

  const handleEditAccount = async (data: AddAccountFormData) => {
    toast("Adding account...", { icon: "⏳" });
    closeEditForm();

    const {
      username,
      password,
      email,
      emailPassword,
      cookies,
      autoConfirmCode,
      tryLogin,
    } = data;

    // Construct request payload based on user input
    const payload: AddAccountPayload = {
      username,
      email,
      auto_email_confirmation_code: autoConfirmCode,
      try_login: tryLogin,
      password,
      email_password: emailPassword,
      cookies,
    };

    const succeed = await requestAddAccount(payload);
    if (!succeed) {
      toast.error("Faild to add new account. Check log for more info");
      return;
    }

    toast.success("Account added successfully");
    refreshData();
  };

  return (
    <AlertDialog.Root open={isEditFormOpen}>
      <AlertDialog.Trigger>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={openEditForm}
        >
          Add new account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="AlertDialogOverlay"
          onClick={handleCloseForm}
        />
        <form onSubmit={handleSubmit(handleEditAccount)}>
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="text-2xl mb-4">
              New account
            </AlertDialog.Title>
            <AlertDialog.Description className="my-2 w-full" asChild>
              <div className="grid grid-cols-2 gap-y-4 w-full">
                {/* Form row 1 */}
                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />
                  {errors?.username?.type === "required" && (
                    <ErrorText>{errors.username.message}</ErrorText>
                  )}
                </div>

                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    {...register("password")}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />
                </div>

                {/* Form row 2 */}
                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    {...register("email")}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />
                </div>

                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="email-password">Email password</label>
                  <input
                    id="email-password"
                    {...register("emailPassword")}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />
                </div>

                <div className="col-span-2 space-y-1 flex flex-col items-start w-full">
                  <label htmlFor="cookies">Cookies</label>
                  <textarea
                    id="cookies"
                    {...register("cookies")}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300 w-1/2"
                  />
                </div>

                <div className="w-full border border-gray-500 col-span-2"></div>

                {/* Form row 3 */}
                <div className="col-span-2">
                  <div className="space-x-4">
                    <label htmlFor="auto-email-code">
                      Auto confirm email code?
                    </label>
                    <input
                      type="checkbox"
                      id="auto-email-code"
                      {...register("autoConfirmCode", {
                        disabled: !watch("email") && !watch("emailPassword"),
                      })}
                      className="disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    *Email and email&apos;s password are required to enable this
                  </div>
                </div>

                {/* Form row 4 */}
                <div className="col-span-2 ">
                  <div className="space-x-4">
                    <label htmlFor="try-login">Try login?</label>
                    <input
                      type="checkbox"
                      id="try-login"
                      {...register("tryLogin", {
                        disabled: !watch("password") && !watch("cookies"),
                      })}
                      className="disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    *Password or cookies are required to enable this
                  </div>
                </div>
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
                  Add account
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </form>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AddAccountButton;
