import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type { Wallet, WalletTransaction } from "@/types/wallet";

export const useWallet = function () {
  const { data, isFetching, refetch } = useGetData<APIResponse<Wallet>>({
    url: API_ENDPOINTS.wallet.get,
  });

  return { wallet: data?.data, isFetching, refetch };
};

export const useWalletTransactions = function ({
  page = 1,
  limit = 5,
  type,
}: {
  page?: number;
  limit?: number;
  type?: string;
} = {}) {
  const { data, isFetching } = useGetData<PaginatedResponse<WalletTransaction>>(
    {
      url: API_ENDPOINTS.wallet.transactions({ page, limit, type }),
    },
  );

  return {
    transactions: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    isFetching,
  };
};

// The poll fallback behind "Transfer Done" — webhooks cannot reach a local dev
// server, and the credit is idempotent so syncing twice is harmless.
export const useSyncFunding = function ({
  onSynced,
}: {
  onSynced: (credited: number) => void;
}) {
  const { mutate, isPending } = useSubmitData<
    undefined,
    APIResponse<{ credited: number }>
  >({
    url: API_ENDPOINTS.wallet.sync,
    method: "post",
    silent: true,
    additionalQueryKeys: [
      [API_ENDPOINTS.wallet.get],
      [API_ENDPOINTS.wallet.transactions({ page: 1, limit: 5 })],
    ],
    onSuccess: (data) => onSynced(data.data.credited),
  });

  return { sync: mutate, isSyncing: isPending };
};
