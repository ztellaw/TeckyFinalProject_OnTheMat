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
