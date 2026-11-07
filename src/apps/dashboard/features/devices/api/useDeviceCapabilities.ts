import type { Api } from '@jellyfin/sdk';
import type { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { DeviceCapabilities } from 'apps/dashboard/features/devices/types/deviceCapabilities';
import { useApi } from 'hooks/useApi';

import { QUERY_KEY as DEVICES_QUERY_KEY } from './useDevices';

const fetchDeviceCapabilities = async (
    api: Api,
    id: string,
    options?: AxiosRequestConfig
) => {
    // The endpoint is not in the generated SDK yet, so call it directly
    const response = await api.axiosInstance.get<DeviceCapabilities>(
        api.getUri('/Devices/Capabilities'),
        {
            params: { id },
            headers: { Authorization: api.authorizationHeader },
            signal: options?.signal
        }
    );

    return response.data;
};

export const useDeviceCapabilities = (id?: string | null) => {
    const { api } = useApi();
    return useQuery({
        queryKey: [ DEVICES_QUERY_KEY, 'Capabilities', id ],
        queryFn: ({ signal }) =>
            fetchDeviceCapabilities(api!, id!, { signal }),
        enabled: !!api && !!id,
        staleTime: 0
    });
};
