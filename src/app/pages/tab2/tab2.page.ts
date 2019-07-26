
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];

    this.cargarNoticias( this.categorias[0] );
   }

   cargarNoticias( categoria: string, event? ) {

    this.noticiasService.getTopHeadlinesCategory( categoria )
          .subscribe( resp => {
            // console.log(resp);
            this.noticias.push( ...resp.articles );

            if ( event ) {
              event.target.complete();
            }
          });
  }

   segmentChanged(event) {
    this.noticias = [];

    this.cargarNoticias( event.detail.value );
   }

   loadData(event) {
    this.cargarNoticias( this.segment.value, event );
   }

}
