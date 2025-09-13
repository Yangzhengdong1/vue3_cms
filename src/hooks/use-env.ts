const useEnv = () => {
  const isProd = () => process.env.NODE_ENV === "production";
  const isDev = () => !isProd();

  return [isProd, isDev];
};

export default useEnv;
