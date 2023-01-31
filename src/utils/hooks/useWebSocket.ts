import { useEffect, useRef } from 'react';
import { useUserInfo } from './useUserInfo';
import { isDev, server } from '@/config';
export const useWebSocket = (
  onMessage: (data?: any) => any,
  config?: {
    close?: boolean;
    deps?: React.DependencyList;
  }
) => {
  const { close, deps } = {
    close: true,
    deps: [],
    ...config,
  };

  const ws = useRef<WebSocket | null>(null);

  const initWs = () => {
    ws.current = new WebSocket(
      `ws${server.safe}://${server.baseURL}/webSocket/${id}`
    );
  };
  const [
    {
      user: { id },
    },
  ] = useUserInfo();
  useEffect(() => {
    try {
      if (!ws.current) {
        initWs();
      }
      if (ws.current && deps.length > 0) {
        initWs();
      }
      ws.current.onmessage = ({ data }) => {
        onMessage(JSON.parse(data));
      };
      return () => {
        if (close) {
          ws.current.close();
        }
      };
    } catch (error) {}
  }, deps);
};
