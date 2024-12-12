import { useStore } from "@/store";

export const usePremission = (pageName: string, handleName: string) => {
  const store = useStore();
  const queryPermission = `${pageName}_${handleName}`;
  const premissions = store.state.login.userPermissions;
  return premissions.includes(queryPermission);
};
