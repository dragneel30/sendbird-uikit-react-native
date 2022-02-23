import React, { useEffect } from 'react';
import type Sendbird from 'sendbird';

import { Logger, SendbirdChatSDK } from '@sendbird/uikit-utils';

const useUserEventHandler = (
  sdk: SendbirdChatSDK,
  handlerId: string,
  hookHandler: Partial<Sendbird.UserEventHandler>,
  deps: React.DependencyList = [],
) => {
  useEffect(() => {
    Logger.info('[useUserEventHandler]', handlerId);

    const handler = new sdk.UserEventHandler();
    const handlerKeys = Object.keys(handler) as (keyof typeof handler)[];
    handlerKeys.forEach((key) => {
      const hookHandlerFn = hookHandler[key];
      if (hookHandlerFn) handler[key] = hookHandlerFn as () => unknown;
    });

    sdk.addUserEventHandler(handlerId, handler);
    return () => sdk.removeUserEventHandler(handlerId);
  }, [sdk, handlerId, ...deps]);
};

export default useUserEventHandler;
