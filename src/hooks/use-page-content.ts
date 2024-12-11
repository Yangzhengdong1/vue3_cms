import { ref, Ref } from "vue";
import PageContent from "@/components/page-content";

type UsePageContent = [
  Ref<any, any>,
  (queryInfo: any) => void,
  (queryInfo: any) => void
];

export const usePageContent = () => {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const handleQuery = (queryInfo: any) => {
    pageContentRef.value?.fetchPageList(queryInfo);
  };

  const handleRefresh = (queryInfo: any) => {
    pageContentRef.value?.fetchPageList(queryInfo);
  };

  return [pageContentRef, handleQuery, handleRefresh] as UsePageContent;
};
