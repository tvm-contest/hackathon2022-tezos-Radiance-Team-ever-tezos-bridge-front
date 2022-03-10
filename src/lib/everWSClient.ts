import {TonClient} from "@eversdk/core";
import {libWeb} from "@eversdk/lib-web";

// eslint-disable-next-line react-hooks/rules-of-hooks
TonClient.useBinaryLibrary(libWeb as any);

const client = new TonClient({
  network: {
    endpoints: ["net.ton.dev"],
  },
});

export default client;
