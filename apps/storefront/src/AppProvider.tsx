import { FC, useCallback } from "react";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  IOrderCloudErrorContext,
  OrderCloudProvider,
} from "@rwatt451/ordercloud-react";
import {
  ALLOW_ANONYMOUS,
  BASE_API_URL,
  CLIENT_ID,
  CUSTOM_SCOPE,
  SCOPE,
} from "./constants";
import { useToast } from "@chakra-ui/react";
import { OrderCloudError } from "ordercloud-javascript-sdk";
import GlobalLoadingIndicator from "./components/GlobalLoadingIndicator";
import { BreadCrumbItemsProvider } from "./hooks/useBreadcrumbItems";

const basename = import.meta.env.VITE_APP_CONFIG_BASE;

const router = createBrowserRouter(routes, { basename });

const AppProvider: FC = () => {
  const toast = useToast();

  const defaultErrorHandler = useCallback(
    (error: OrderCloudError, { logout }: IOrderCloudErrorContext) => {
      if (error.status === 401) {
        console.log("DEFAULT ERROR HANDLER", 401);
        return logout();
      }
      if (!toast.isActive(error.errorCode)) {
        toast({
          id: error.errorCode,
          title: error.status === 403 ? "Permission denied" : error.message,
          status: "error",
        });
      }
    },
    [toast]
  );

  return (
    <OrderCloudProvider
      baseApiUrl={BASE_API_URL}
      clientId={CLIENT_ID}
      scope={SCOPE}
      customScope={CUSTOM_SCOPE}
      allowAnonymous={ALLOW_ANONYMOUS}
      defaultErrorHandler={defaultErrorHandler}
    >
      <BreadCrumbItemsProvider />
      <RouterProvider router={router} />
      <GlobalLoadingIndicator />
    </OrderCloudProvider>
  );
};

export default AppProvider;
