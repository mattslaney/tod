import { UserAgent } from "sip.js";
import { SimpleUser, SimpleUserDelegate, SimpleUserOptions } from "sip.js/lib/platform/web";
import { store } from "../store";

export interface PhoneConfig {
  username: string,
  password: string,
  server: string
}

export enum PhoneStatus {
  online,
  ringing,
  busy,
  offline,
  error
}

export class SimplePhone {
  private simpleUser: SimpleUser;

  private username: string;
  private password: string;
  private aor: string;

  private sipServer: string;
  private wsServer: string;
  private wsPort: number;
  private wssPort: number;

  private options: SimpleUserOptions;
  private _status: PhoneStatus;

  constructor(config: PhoneConfig) {
    this.username = config.username;
    this.password = config.password;
    this.sipServer = config.server;
    this.wsServer = config.server;
    this.wsPort = 5066;
    this.wssPort = 7443;
    this.aor = `sip:${this.username}@${this.sipServer}`;
    this._status = PhoneStatus.offline;

    this.options = {
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

    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    if(window.location.protocol === 'https:') {
      console.log("using wss");
      this.simpleUser = new SimpleUser(`wss://${this.wsServer}:${this.wssPort}`, this.options)
    } else {
      console.log("using ws");
      this.simpleUser = new SimpleUser(`ws://${this.wsServer}:${this.wsPort}`, this.options)
    }
  }

  public async register(simpleUserDelegate?: SimpleUserDelegate): Promise<void> {
    if(simpleUserDelegate !== undefined) {
      this.simpleUser.delegate = simpleUserDelegate;
    } else {
      this.simpleUser.delegate = {
				onCallCreated: (): void => {
					console.log(`%cCall created: ${this.aor}`, 'color: green');
          this._status = PhoneStatus.busy;
          window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "busy"}}));
				},
				onCallAnswered: (): void => {
					console.log(`%cCall answered: ${this.aor}`, 'color: green');
          this._status = PhoneStatus.busy;
          window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "busy"}}));
				},
				onCallHangup: (): void => {
					console.log(`%cCall hangup: ${this.aor}`, 'color: green');
          this._status = PhoneStatus.online;
          window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "online"}}));
				},
				onCallHold: (held: boolean): void => {
					console.log(`%cCall hold ${held}: ${this.aor}`, 'color: green');
          this._status = PhoneStatus.busy;
          window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "busy"}}));
				},
				onCallReceived: () => {
					console.log(`%cIncoming Call for ${this.aor}!`, 'color: green');
          this._status = PhoneStatus.ringing;
          window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "ringing"}}));
        }
			};
    }
    await this.simpleUser?.connect();
    const registered = await this.simpleUser?.register();
    this._status = PhoneStatus.online;
    window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "online"}}));
    return registered;
  }

  public async unregister(): Promise<void> {
    await this.simpleUser?.unregister();
    const disconnected = await this.simpleUser?.disconnect();
    this._status = PhoneStatus.offline;
    window.dispatchEvent(new CustomEvent("PhoneStatus", {detail: {status: "offline"}}));
    return disconnected;
  }

  public async call(destination: string): Promise<void> {
    if( !/^sip\:/.test(destination) ) {
      destination = "sip:" + destination;
    }
    if( destination.indexOf('@') < 0 ) {
      destination += `@${this.sipServer}`;
    }
    return await this.simpleUser?.call(destination);
  }

  public async answer() {
    return await this.simpleUser?.answer();
  }

  public async hangup() {
    return await this.simpleUser?.hangup();
  };

  public sendDTMF(key: string) {
    this.simpleUser?.sendDTMF(key);
  }

  get status() {
    return this._status;
  }
}
