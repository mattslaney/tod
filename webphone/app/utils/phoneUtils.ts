import { UserAgent } from "sip.js";
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";

export class SimplePhone {
  private simpleUser: SimpleUser | undefined;

  private username: string;
  private password: string;
  private aor: string;

  private sipServer: string;
  private wsServer: string;
  private wsPort: number;
  private wssPort: number;

  constructor(
    sipServer: string,
    username: string,
    password: string,
    wsServer: string = sipServer,
    wsPort: number = 5066,
    wssPort: number = 7443,
  ) {
    this.username = username;
    this.password = password;
    this.sipServer = sipServer;
    this.wsServer = wsServer;
    this.wsPort = wsPort;
    this.wssPort = wssPort;
    this.aor = `sip:${this.username}@${this.sipServer}`;

    const options: SimpleUserOptions = {
      aor: this.aor,
      media: {
        remote: {
          audio: new Audio(),
        },
      },
      userAgentOptions: {
        displayName: this.username,
        authorizationUsername: this.username,
        authorizationPassword: this.password,
        uri: UserAgent.makeURI(`sip:${this.username}@${this.sipServer}`),
        logBuiltinEnabled: true,
        logConnector: (
          level: string,
          category: string,
          label: string | undefined,
          content: string,
        ) => {
          /* do nothing for now */
        },
      },
    };
    this.simpleUser = new SimpleUser(`ws://${this.wsServer}:${this.wsPort}`, options)
  }

  public async register(): Promise<void> {
    await this.simpleUser?.connect();
    return await this.simpleUser?.register();
  }

  public async unregister(): Promise<void> {
    await this.simpleUser?.unregister();
    return await this.simpleUser?.disconnect();
  }
}
