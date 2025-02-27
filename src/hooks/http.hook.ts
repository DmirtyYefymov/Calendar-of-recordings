import { useState, useCallback } from "react";

type HTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type loadingStatusOptions = 'idle' | 'loading' | 'error';
type HTTPHeaders = Record<string, string>

interface RequestConfig {
    url: string;
    method?: HTTPRequestMethods;
    body?: string | null;
    headers?: HTTPHeaders;
}

export const useHttp = () => {
    const [loadingStatus, setLoadingStatus] = useState<loadingStatusOptions>('idle');

    const request = useCallback(
        async ({
            url,
            method = 'GET',
            body = null,
            headers = { "Content-Type": "application/json" }
        }: RequestConfig
        ) => {
            setLoadingStatus('loading');

            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();

                setLoadingStatus('idle');

                return data;

            } catch (error) {
                setLoadingStatus('error');
                throw error;
            }
        }, []
    );

    return { loadingStatus, request };
}