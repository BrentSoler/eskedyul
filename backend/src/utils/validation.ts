export type TTObject = { [key: string]: any };

type TMode = "normal" | "partial" | "specific";

export type TOption = {
  mode: TMode;
  requiredPartial?: number;
  specificKey?: string;
};

enum MODES {
  NORMAL = "NORMAL",
  PARTIAL = "PARTIAL",
  SPECIFIC = "SPECIFIC",
}

export default class Validation {
  public Obj: TTObject = {};

  private REQUIRED: Array<string> = [];

  constructor(data: TTObject) {
    this.Obj = data;
  }

  register(feild: string | Array<string>) {
    if (typeof feild === "string") {
      this.REQUIRED = [...this.REQUIRED, feild];
      return;
    }
    this.REQUIRED = [...this.REQUIRED, ...feild];
  }

  validate(msg?: string, options?: TOption) {
    if (!options) {
      this.normalValidate(msg);
      return;
    }

    const mode: string = options?.mode?.toUpperCase();

    if (mode === MODES.PARTIAL) {
      if (!options?.requiredPartial) {
        throw new Error(
          "Mode is Partial: need to provide a requiredPartial key in options"
        );
      }
      this.partialValidate(options?.requiredPartial, msg);
      return;
    }

    if (mode === MODES.SPECIFIC) {
      if (!options?.specificKey) {
        throw new Error(
          "Mode is Specific: need to provide a specificKey key in options"
        );
      }
      this.specificValidate(options?.specificKey, msg);
      return;
    }

    this.normalValidate(msg);
  }

  private normalValidate(msg?: string) {
    this.REQUIRED.forEach((feild: any) => {
      if (!this.Obj[feild]) {
        throw new Error(msg ? msg : `Missing Fields`);
      }
    });
  }

  private partialValidate(required: number, msg?: string) {
    const history: Array<boolean> = [];

    this.REQUIRED.forEach((feild: any) => {
      if (!this.Obj[feild]) {
        history.push(false);
        return;
      }
      history.push(true);
    });

    let returned = 0;

    history.forEach((bool) => {
      if (bool) {
        returned += 1;
      }
    });

    if (required > returned) {
      throw new Error(msg ? msg : `Missing Fields`);
    }
  }

  private specificValidate(feild: string, msg?: string) {
    if (!this.Obj[feild]) {
      throw new Error(msg ? msg : `${feild} is Missing`);
    }
  }
}
