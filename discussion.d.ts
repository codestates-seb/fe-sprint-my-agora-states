type Discussions = Discussion[];
interface Discussion {
  id: string;
  createdAt: string;
  title: string;
  url: string;
  author: string;
  answer?: Answer | null;
  bodyHTML: string;
}
// 바로그러하다. 

interface Answer {
  id: string;
  createdAt: string;
  url: string;
  author: string;
  bodyHTML: string;
}
