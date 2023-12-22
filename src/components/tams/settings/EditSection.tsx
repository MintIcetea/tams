"use client";

import { AccountMetadata } from "@/utils/app.type";
import { ReactElement } from "react";
import DeleteAccountButton from "./DeleteAccountBtn";
import EditAccountButton from "./EditAccountBtn";

interface EditSectionProps {
  accountMetadata: AccountMetadata;
}

const EditSection = ({
  accountMetadata,
}: EditSectionProps): ReactElement<EditSectionProps> => {
  return (
    <div className="w-full">
      <div className="font-semibold">Account settings</div>
      <div className="mt-2 space-x-4 flex items-center justify-start">
        <EditAccountButton metadata={accountMetadata} />
        <DeleteAccountButton username={accountMetadata.username} />
      </div>
    </div>
  );
};

export default EditSection;
