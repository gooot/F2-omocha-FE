import { useQuery } from '@tanstack/react-query';

import { getBasicAuction } from '@/apis/queryFunctions/basicAuction';

function useGetBasicAuction(id: number) {
  const { data, refetch } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuction(id),
    enabled: !!id,
    staleTime: 0,
  });
  return { data, refetch };
}

export default useGetBasicAuction;
