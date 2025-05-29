export interface BlogType {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
}
