import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAuctionQnA } from '@/apis/queryFunctions/basicAuction';
import { FetchError } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useDeleteBasicAuctionQnA() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const tokens = getAuthTokens();

  const { mutate, error } = useMutation({
    mutationFn: (id: number) => deleteAuctionQnA(id, tokens),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionQnAList'] });
      showToast('success', 'QnA에 삭제에 성공했습니다.');
    },
    onError: (e: FetchError) => {
      if (e) {
        showToast('error', `${e.resultMsg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });
  return { mutate, error };
}

export default useDeleteBasicAuctionQnA;
