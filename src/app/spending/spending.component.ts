import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit {
  spendingData: any[] = [
    { name: 'Father', totalSpends: 500, monthlyBudget: 1000 },
    { name: 'Mother', totalSpends: 800, monthlyBudget: 1200 },
    { name: 'Child', totalSpends: 300, monthlyBudget: 400 }
  ];

  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.createSpendingPieChart();
    this.createOverspendingPieChart();
    this.createYearlyOverspendingChart();
  }

  editBudget(person: any) {
    // Implement logic to edit budget
    console.log(`Editing budget for ${person.name}`);
  }

  isOverspending(person: any): boolean {
    return person.totalSpends > person.monthlyBudget;
  }

  calculateOverspendingPercentage(person: any): number {
    return Math.round((person.totalSpends / person.monthlyBudget) * 100);
  }

  createSpendingPieChart() {
    const ctx = document.getElementById('spendingPieChart') as HTMLCanvasElement;
    const spendingPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.spendingData.map(person => person.name),
        datasets: [{
          label: 'Spending Percentage',
          data: this.spendingData.map(person => person.totalSpends),
          backgroundColor: ['#007bff', '#28a745', '#dc3545'],
          borderWidth: 1
        }]
      }
    });
  }

  createOverspendingPieChart() {
    const ctx = document.getElementById('overspendingPieChart') as HTMLCanvasElement;
    const overspendingData = this.spendingData.filter(person => this.isOverspending(person));
    const overspendingPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: overspendingData.map(person => person.name),
        datasets: [{
          label: 'Overspending Percentage',
          data: overspendingData.map(person => person.totalSpends),
          backgroundColor: ['#dc3545', '#dc3545', '#dc3545'],
          borderWidth: 1
        }]
      }
    });
  }

  createYearlyOverspendingChart() {
    const ctx = document.getElementById('yearlyOverspendingChart') as HTMLCanvasElement;
    const yearlyOverspendingData = this.spendingData.map(person => {
      return {
        label: person.name,
        data: [person.totalSpends],
        backgroundColor: this.isOverspending(person) ? '#dc3545' : '#28a745',
        borderWidth: 1
      };
    });
    const yearlyOverspendingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Yearly Overspending'],
        datasets: yearlyOverspendingData
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
