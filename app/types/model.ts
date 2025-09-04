export interface Post { 
  title: string;
  body: string;
}

// UserPost extends the Post interface and adds an 'id'
export interface UserPost extends Post {
  id: string;
}