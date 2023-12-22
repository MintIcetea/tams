import LoadingButton from "@/components/common/LoadingButton";

const ActionSection = () => {
  return (
    <div className="w-full">
      <div className="font-semibold">Actions</div>
      <div className="mt-2 flex items-center justify-start space-x-4">
        <LoadingButton
          loading={false}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
        >
          Login
        </LoadingButton>
        <LoadingButton
          loading={false}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
        >
          Run Flow
        </LoadingButton>
        <LoadingButton
          loading={false}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
        >
          Refresh
        </LoadingButton>
      </div>
    </div>
  );
};

export default ActionSection;
