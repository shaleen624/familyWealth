import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss'],
})
export class SpendingComponent implements OnInit {
  spendingData: any[] = [
    { name: 'Father', totalSpends: 3400, monthlyBudget: 3000 },
    { name: 'Mother', totalSpends: 800, monthlyBudget: 4000 },
    { name: 'Child', totalSpends: 600, monthlyBudget: 400 },
  ];

  spendingPieChart!: any;
  overspendingPieChart!: any;
  yearlyOverspendingChart!: any;

  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.updateCharts();
  }

  updateCharts() {
    this.destroyCharts();
    this.createSpendingPieChart();
    //this.createOverspendingPieChart();
    this.createYearlyOverspendingChart();
  }

  editBudget(person: any) {
    // Implement logic to edit budget
    console.log(`Editing budget for ${person.name}`);
  }

  toggleEditMode(person: any) {
    person.editMode = !person.editMode;
    if (!person.editMode) {
      this.saveBudget(person);
      this.updateCharts();
    }
  }

  saveBudget(person: any) {
    // Save logic
    console.log('Edited budget:', person.monthlyBudget);
  }

  isOverspending(person: any): boolean {
    return person.totalSpends > person.monthlyBudget;
  }

  calculateOverspendingPercentage(person: any): number | string {
    if (
      person.monthlyBudget &&
      person.totalSpends &&
      person.totalSpends > person.monthlyBudget
    )
      return Math.round(
        ((person.totalSpends - person.monthlyBudget) / person.monthlyBudget) *
          100
      );
    else return 0;
  }

  calculateOverspending(person: any): number | string {
    if (
      person.monthlyBudget &&
      person.totalSpends &&
      person.totalSpends > person.monthlyBudget
    )
      return Math.round(person.totalSpends - person.monthlyBudget);
    else return 0;
  }

  createSpendingPieChart() {
    const ctx: any = document.getElementById(
      'spendingPieChart'
    ) as HTMLCanvasElement;
    this.spendingPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.spendingData.map((person) => person.name),
        //labels: ['Father, Mother, Child'],
        datasets: [
          {
            label: 'Spending Percentage',
            data: this.spendingData.map((person) => person.totalSpends),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        //maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value: any = context.raw || '';
                return `${label}: $${value.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  }

  createOverspendingPieChart() {
    const ctx = document.getElementById(
      'overspendingPieChart'
    ) as HTMLCanvasElement;
    const overspendingData = this.spendingData.filter((person) =>
      this.isOverspending(person)
    );
    this.overspendingPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: overspendingData.map((person) => person.name),
        datasets: [
          {
            label: 'Overspending Percentage',
            data: overspendingData.map((person) => person.totalSpends),
            backgroundColor: ['#dc3545', '#dc3545', '#dc3545'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value: any = context.raw || '';
                return `${label}: $${value.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  }

  createYearlyOverspendingChart() {
    const ctx = document.getElementById(
      'yearlyOverspendingChart'
    ) as HTMLCanvasElement;
    const yearlyOverspendingData = this.spendingData.map((person) => {
      return {
        label: person.name,
        data: [person.totalSpends],
        backgroundColor: this.isOverspending(person) ? '#dc3545' : '#28a745',
        borderWidth: 1,
        //barThickness: 30, // Adjust the width of each bar as needed
        //barPercentage: 0.3, // Adjust the width of each bar
        //categoryPercentage: 0.8 // Adjust the gap between the bars
      };
    });
    this.yearlyOverspendingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Yearly Overspending'],
        datasets: yearlyOverspendingData,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value: any = context.parsed.y || '';
                return `${label}: $${value.toFixed(2)}`;
              },
            },
          },
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
        },
        // indexAxis: 'y',
      },
    });
  }

  destroyCharts() {
    if (this.spendingPieChart) {
      this.spendingPieChart.destroy();
    }
    if (this.overspendingPieChart) {
      this.overspendingPieChart.destroy();
    }
    if (this.yearlyOverspendingChart) {
      this.yearlyOverspendingChart.destroy();
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }
}
