import { ref, Ref } from "vue";
import PageModal from "@/components/page-modal";

type UserPageModal = [Ref<any, any>, any, () => void, (info: any) => void];
type CallbackFn = () => void;

export const usePageModal = (
  newCb?: CallbackFn,
  editCb?: CallbackFn
): UserPageModal => {
  const defaultInfo = ref({});
  const pageModalRef = ref<InstanceType<typeof PageModal>>();

  const handleAddData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb();
  };

  const handleEditData = (info: any) => {
    defaultInfo.value = { ...info };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb();
  };

  return [pageModalRef, defaultInfo, handleAddData, handleEditData];
};
