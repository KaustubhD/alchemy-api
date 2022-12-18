import { ArticleDto } from "./article.dto";

export class NewsResponseDto {
  status: string;
  totalResults: number;
  articles: ArticleDto[];
}