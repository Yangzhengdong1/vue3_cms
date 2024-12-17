import { useStore } from "@/store";

export const useFormOptions = () => {
  const store = useStore();
  const roleOptions = store.state.integrityRole;
  const departmentOptions = store.state.integrityDepartment;
  const levelOptions = store.state.integrityLevel;

  return [roleOptions, departmentOptions, levelOptions];
};
