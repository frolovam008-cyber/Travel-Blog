// AUTH

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// USER

export interface User {
  id: number;
  full_name: string;
  city: string;
  country: string;
  bio: string;
  photo?: string;
}

export interface UpdateUserForm {
  full_name?: string;
  city?: string;
  country?: string;
  bio?: string;
  photo?: File;
}

export interface UserInfo {
  full_name: string;
  city?: string;
  country?: string;
  bio?: string;
}

export interface ChangePasswordRequest {
  password: string;
}

// POSTS

export interface PostAuthorInfo {
  full_name: string;
  city: string;
  country: string;
  bio: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  county: string;
  city: string;
  photo: string;
  comments: Comment[];
  userInfo: PostAuthorInfo;
}

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

export interface CreatePostForm {
  title: string;
  description: string;
  country: string;
  city: string;
  photo: File;
}

// COMMENTS

export interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  comment: string;
  created_at: string;
}

export interface CreateCommentRequest {
  full_name: string;
  comment: string;
}

// API ERRORS

export interface ApiError {
  error: string;
}

// иногда backend возвращает ошибки в таком виде
export type ValidationErrors = Record<string, string[]>;






