export interface ReviewAuthor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_pic: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  tags: string[];
  createdAt: string;
  author: ReviewAuthor;
  booking: { reference: string; title: string; starts_at: string } | null;
}

export interface ReviewSummary {
  average: number;
  total: number;
  rating_distribution: Record<string, number>;
  five_star_count: number;
  five_star_percent: number;
  top_strength: string | null;
  tags: { tag: string; count: number }[];
}
