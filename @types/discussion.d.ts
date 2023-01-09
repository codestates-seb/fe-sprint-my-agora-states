type Discussions = Discussion[];
export interface Discussion {
  id: string;
  createdAt: string;
  title: string;
  url: string;
  author: string;
  answer?: Answer | null;
  bodyHTML: string;
  avatarUrl: string;
}

export interface Answer {
  id: string;
  createdAt: string;
  url: string;
  avatarUrl: string;
  author: string;
  bodyHTML: string;
}
