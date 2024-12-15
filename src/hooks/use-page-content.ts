import { ref, Ref } from "vue";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";

type UsePageContent = [
  Ref<any, any>,
  (queryInfo: any) => void,
  (queryInfo: any) => void
];

export const usePageContent = () => {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

  const handleQuery = (queryInfo: any) => {
    pageContentRef.value?.fetchPageList(queryInfo);
  };

  const handleReset = (queryInfo: any) => {
    pageContentRef.value?.fetchPageList(queryInfo);
  };

  const handleRefresh = () => {
    const formData = pageSearchRef.value.formData;
    const [startTime = "", endTime = ""] = formData.dateTime ?? [];
    const queryInfo = { ...formData, startTime, endTime } as any;
    delete queryInfo.dateTime;

    pageContentRef.value?.fetchPageList(queryInfo);
  };

  return [pageContentRef, handleQuery, handleReset] as UsePageContent;
};
