type Discussions = Discussion[];
interface Discussion {
  id: string;
  createdAt: string;
  title: string;
  url: string;
  author: string;
  avatarUrl: string;
  answer?: Answer | null;
  bodyHTML: string;
}

interface Answer {
  id: string;
  createdAt: string;
  url: string;
  avatarUrl: string;
  author: string;
  bodyHTML: string;
}
