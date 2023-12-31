import { useCallback, useEffect, useRef, useState } from 'react';
import useAPI from './useAPI';
import type {
    TSocketAcceptableProps,
    TSocketError,
    TSocketRequestPayload,
    TSocketResponseData,
    TSocketSubscribableEndpointNames,
} from '../types';

const useSubscription = <T extends TSocketSubscribableEndpointNames>(name: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState<TSocketError<T>>();
    const [data, setData] = useState<TSocketResponseData<T>>();
    const subscriber = useRef<{ unsubscribe?: VoidFunction }>();
    const { subscribe: _subscribe } = useAPI();

    const subscribe = useCallback(
        (...props: TSocketAcceptableProps<T>) => {
            const prop = props?.[0];
            const payload = prop && 'payload' in prop ? (prop.payload as TSocketRequestPayload<T>) : undefined;

            setIsLoading(true);
            setIsSubscribed(true);

            try {
                subscriber.current = _subscribe(name, payload).subscribe(
                    async response => {
                        setData(await response);
                        setIsLoading(false);
                    },
                    async response => {
                        setError((await response).error as unknown as TSocketError<T>);
                        setIsLoading(false);
                    }
                );
            } catch (e) {
                setError(e as TSocketError<T>);
            }
        },
        [_subscribe, name]
    );

    const unsubscribe = useCallback(() => {
        subscriber.current?.unsubscribe?.();
        setIsSubscribed(false);
    }, []);

    useEffect(() => {
        return () => {
            unsubscribe();
        };
    }, [unsubscribe]);

    return {
        subscribe,
        unsubscribe,
        isLoading,
        isSubscribed,
        error,
        data,
    };
};

export default useSubscription;
