export interface CommentI {
  id?: string;
  name?: string;
  userID: string;
  blogID: string;
  content: string;
  date: string;
  like: number;
  dislike: number;
}
