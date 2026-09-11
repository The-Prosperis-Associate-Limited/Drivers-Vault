import { useGetData } from "@/hooks/use-get-data";
import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { APIResponse, PaginatedResponse } from "@/types/response";
import type {
  BankAccount,
  BankOption,
  EarningsSummary,
  EarningsTrendPoint,
  Payout,
  WalletTransaction,
} from "@/types/earnings";

export const useEarningsSummary = function () {
  const { data, isFetching } = useGetData<APIResponse<EarningsSummary>>({
    url: API_ENDPOINTS.earnings.summary,
  });

  return { summary: data?.data, isFetching };
};

export const useEarningsHistory = function ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data, isFetching } = useGetData<PaginatedResponse<WalletTransaction>>(
    {
      url: API_ENDPOINTS.earnings.history({ page, limit }),
    },
  );

  return {
    transactions: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
    isFetching,
  };
};

export const useEarningsTrend = function () {
  const { data, isFetching } = useGetData<APIResponse<EarningsTrendPoint[]>>({
    url: API_ENDPOINTS.earnings.trend,
  });

  return { trend: data?.data ?? [], isFetching };
};

export const useBankAccounts = function () {
  const { data, isFetching } = useGetData<APIResponse<BankAccount[]>>({
    url: API_ENDPOINTS.earnings.bankAccounts,
  });

  return { bankAccounts: data?.data ?? [], isFetching };
};

export const useBanks = function ({
  country,
  currency,
  shouldFetch,
}: {
  country: string;
  currency: string;
  shouldFetch: boolean;
}) {
  const { data, isFetching } = useGetData<APIResponse<BankOption[]>>({
    url: API_ENDPOINTS.earnings.banks({ country, currency }),
    shouldFetch,
  });

  return { banks: data?.data ?? [], isFetching };
};

export const useAddBankAccount = function ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { mutate, isPending } = useSubmitData<
    {
      bank_code: string;
      bank_name: string;
      account_number: string;
      currency: string;
    },
    APIResponse<BankAccount>
  >({
    url: API_ENDPOINTS.earnings.bankAccounts,
    method: "post",
    // The account name is never sent — the server resolves it with the bank so
    // a typo cannot send money to a stranger.
    onSuccessMessage: "Bank account added",
    additionalQueryKeys: [[API_ENDPOINTS.earnings.bankAccounts]],
    onSuccess: () => onSuccess?.(),
  });

  return { addBankAccount: mutate, isPending };
};

export const useRequestWithdrawal = function ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { mutate, isPending } = useSubmitData<
    { amount: number; bankAccountId?: string },
    APIResponse<Payout>
  >({
    url: API_ENDPOINTS.earnings.requestWithdrawal,
    method: "post",
    onSuccessMessage: "Withdrawal requested",
    additionalQueryKeys: [
      [API_ENDPOINTS.earnings.summary],
      [API_ENDPOINTS.earnings.withdrawals({ page: 1, limit: 10 })],
      [API_ENDPOINTS.driverDashboard.stats],
    ],
    onSuccess: () => onSuccess?.(),
  });

  return { requestWithdrawal: mutate, isPending };
};

export const useWithdrawals = function ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data, isFetching } = useGetData<PaginatedResponse<Payout>>({
    url: API_ENDPOINTS.earnings.withdrawals({ page, limit }),
  });

  return { withdrawals: data?.data ?? [], isFetching };
};
