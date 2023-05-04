type Discussions = Discussion[];
interface Discussion {
  id: D_kwDOHOApLM4APXTS;
  createdAt: 2022-04-22T14:08:33Z;
  title: string;
  url: string;
  author: string;
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
