import { load } from 'cheerio';
import frontMatter from 'gray-matter';

type GitHubIssue = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
  }[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: unknown[];
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  body: string;
  body_html: string;
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
};

type BlogPost = {
  id: number;
  title: string;
  desc: string;
  html: string;
  date: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`https://api.github.com/repos/boblauer/boblauer.com/issues`, {
    cache: 'force-cache',
    headers: {
      accept: 'application/vnd.github.full+json',
      authorization: `Bearer ${process.env.GH_API_TOKEN}`,
      'x-github-api-version': '2022-11-28',
    },
  });

  const issues = (await res.json()) as unknown as GitHubIssue[];

  return issues
    .filter((issue) => !issue.labels.map((label) => label.name).includes('draft'))
    .map((issue) => {
      const parsed = frontMatter(issue.body, { delimiters: ['<!--', '-->'] });

      const $ = load(issue.body_html);
      $('a').each((_, el) => {
        if ($(el).attr('href')?.startsWith('http')) {
          $(el).attr('target', '_blank');
        }
      });

      return {
        id: issue.id,
        title: issue.title,
        desc: parsed.data.description,
        html: $.html(),
        date: parsed.data.date,
      };
    });
}
