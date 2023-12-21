import { EditAccountPayload } from "@/api/tams/account/account.type";
import Button from "@/components/common/Button";
import { AccountMetadata } from "@/utils/app.type";
import { useToggle } from "@/utils/hooks/useToggle";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactElement, useCallback } from "react";
import { useForm } from "react-hook-form";

interface EditAccountButtonProps {
  metadata: AccountMetadata;
}

interface EditAccountFormData {
  username: string;
  password: string;
  email: string;
  emailPassword: string;
  cookies: string;
  autoConfirmCode: boolean;
  tryLogin: boolean;
  editPassword: boolean;
  editEmailPassword: boolean;
  editCookies: boolean;
}

const EditAccountButton = ({
  metadata,
}: EditAccountButtonProps): ReactElement<EditAccountButtonProps> => {
  const {
    isOpen: isEditFormOpen,
    open: openEditForm,
    close: closeEditForm,
  } = useToggle();

  const handleCloseForm = useCallback(() => {
    reset();
    closeEditForm();
  }, []);

  const { username, email, auto_email_confirmation_code } = metadata;
  const { register, reset, watch, handleSubmit } = useForm<EditAccountFormData>(
    {
      defaultValues: {
        username,
        email,
        password: "",
        emailPassword: "",
        cookies: "",
        autoConfirmCode: auto_email_confirmation_code,
        tryLogin: true,
        editCookies: false,
        editEmailPassword: false,
        editPassword: false,
      },
    },
  );

  const handleEditAccount = async (data: EditAccountFormData) => {
    const {
      username,
      password,
      email,
      emailPassword,
      cookies,
      autoConfirmCode,
      tryLogin,
      editPassword,
      editEmailPassword,
      editCookies,
    } = data;

    // Construct request payload based on user input
    const payload: EditAccountPayload = {
      username,
      email,
      auto_email_confirmation_code: autoConfirmCode,
      try_login: tryLogin,
    };
    if (editPassword) {
      payload.password = password;
    }
    if (editEmailPassword) {
      payload.email_password = emailPassword;
    }
    if (editCookies) {
      payload.cookies = cookies;
    }
  };

  return (
    <AlertDialog.Root open={isEditFormOpen}>
      <AlertDialog.Trigger asChild>
        <Button
          className="bg-blue-400 hover:bg-blue-500 text-white"
          onClick={openEditForm}
        >
          Edit account
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
              Edit account
            </AlertDialog.Title>
            <AlertDialog.Description className="my-2 w-full">
              <div className="grid grid-cols-2 gap-y-4 w-full">
                {/* Form row 1 */}
                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    {...register("username")}
                    className="px-4 py-2 rounded-lg border border-slate-500"
                  />
                </div>

                <div className="space-y-1 flex flex-col items-start">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    {...register("password", {
                      disabled: !watch("editPassword"),
                    })}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />

                  <span className="space-x-4">
                    <input
                      type="checkbox"
                      id="edit-password"
                      {...register("editPassword")}
                    />
                    <label htmlFor="edit-password">Edit password?</label>
                  </span>
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
                    {...register("emailPassword", {
                      disabled: !watch("editEmailPassword"),
                    })}
                    className="px-4 py-2 rounded-lg border border-slate-500 disabled:bg-gray-300"
                  />

                  <span className="space-x-4">
                    <input
                      type="checkbox"
                      id="edit-email-password"
                      {...register("editEmailPassword")}
                    />
                    <label htmlFor="edit-email-password">Edit password?</label>
                  </span>
                </div>

                <div className="w-full border border-gray-500 col-span-2"></div>

                {/* Form row 3 */}
                <div className="col-span-2 space-x-4">
                  <label htmlFor="auto-email-code">
                    Auto confirm email code?
                  </label>
                  <input
                    type="checkbox"
                    id="auto-email-code"
                    {...register("autoConfirmCode")}
                  />
                </div>

                {/* Form row 4 */}
                <div className="col-span-2 space-x-4">
                  <label htmlFor="try-login">Try login?</label>
                  <input
                    type="checkbox"
                    id="try-login"
                    {...register("tryLogin")}
                  />
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
                <Button className="bg-blue-400 hover:bg-blue-500 text-white">
                  Edit
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </form>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default EditAccountButton;
