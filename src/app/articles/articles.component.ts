import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';

export interface MyScullyRoute {
  route: string;
  title?: string;
  slugs?: string[];
  published?: boolean;
  slug?: string;
  sourceFile?: string;
  lang?: string;
  [prop: string]: any;
  description?: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  posts: MyScullyRoute[] = [];
  private routeSub: Subscription | undefined;
  constructor(private scullyService: ScullyRoutesService) {}

  ngOnInit(): void {
    this.routeSub = this.scullyService.available$.subscribe((posts) => {
      this.posts = posts.filter((post) => post.title);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
