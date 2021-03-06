import { Component, ViewChild } from '@angular/core';
import { CloudData, CloudOptions } from './tag-cloud-module/tag-cloud.interfaces';
import { TagCloudComponent } from './tag-cloud-module/tag-cloud.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TagCloudComponent) child: TagCloudComponent;

  options: CloudOptions = {
    width : 1,
    height : 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: .3
    },
    realignOnResize: true
  };

  data: CloudData[] = this._randomData(50);

  dataStrict: CloudData[] = [
    { text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee' }
  ];

  newDataFromObservable() {
    const changedData$: Observable<CloudData[]> = of(this._randomData(50));
    changedData$.subscribe(res => this.data = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  reDraw() {
    this.child.reDraw();
  }

  private _randomData(cnt?: number): CloudData[] {
    if (!cnt) { cnt = 20; }

    const cd: CloudData[] = [];

    for (let i = 0; i < cnt; i++) {
      let link: string;
      let color: string;
      let external: boolean;
      let weight = 5;
      let text = '';
      let rotate = 0;

      // randomly set link attribute and external
      if (Math.random() >= 0.5) {
        link = 'http://example.org';
        if (Math.random() >= 0.5) { external = true; }
      }

      // randomly rotate some elements (less probability)
      if (Math.random() >= 0.8) {
        const plusMinus = Math.random() >= 0.5 ? '' : '-';
        rotate = Math.floor(Math.random() * Number(`${plusMinus}20`) + 1);
      }

      // randomly set color attribute
      if (Math.random() >= 0.5) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

      // set random weight
      weight = Math.floor((Math.random() * 10) + 1);

      text = `weight-${weight}`;
      if (color) { text += '-color'; }
      if (link) { text += '-link'; }
      if (external) { text += '-external'; }

      const el: CloudData = {
        text: text,
        weight: weight,
        color: color,
        link: link,
        external: external,
        rotate: rotate
      };

      cd.push(el);
    }

    return cd;
  }
}

