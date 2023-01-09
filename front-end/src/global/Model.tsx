export interface commentFormat {
  id: number;
  username: string;
  comment: string;
  review: number;
}

export interface userInformation {
  id: number;
  email: string;
  username: string;
  gender: "male" | "female" | "other";
}

export interface loginFormat {
  email: string;
  password: string;
}

export type Rule = {
  match: (value: string) => boolean | RegExpMatchArray | null;
  reason: string;
};
