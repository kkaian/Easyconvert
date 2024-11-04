import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  ngAfterViewInit() {
    if (this.chartCanvas?.nativeElement) {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.getLast30Days(),
          datasets: [
            {
              label: 'Cotação do Euro',
              data: [/* depois vai ter api relaxa doidão */],
              fill: false,
              borderColor: 'blue',
            },
          ],
        },
      });
    }
  }

  getLast30Days(): string[] {
    const dates = [];
    const today = new Date();
  
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toLocaleDateString('pt-BR')); 
    }
  
    return dates.reverse(); 
  }
}
