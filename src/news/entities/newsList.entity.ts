import { ApiProperty } from "@nestjs/swagger";
import { News } from "./news.entity";

export class NewsList {
  @ApiProperty()
  public count: number;

  @ApiProperty({
    isArray: true,
    type: News,
  })
  public data: News[];

  public constructor(newsArray: News[]) {
    this.count = newsArray.length;
    this.data = newsArray;
  }
}