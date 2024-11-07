// Données pour barChartData (Employés Actifs par mois)
export const barChartData = [
  {
    name: "Employés Actifs",
    data: [45, 47, 50, 52, 49, 51, 53, 52, 50, 48, 49, 51],
  },
];

// Options pour barChartOptions
export const barChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  xaxis: {
    categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Août", "Sep", "Oct", "Nov", "Déc"],
    labels: {
      style: {
        colors: "#A0AEC0",
        fontSize: "12px",
      },
    },
    show: true,
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      style: {
        colors: "#A0AEC0",
        fontSize: "14px",
      },
    },
  },
  fill: {
    colors: "#ED8936",
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  plotOptions: {
    bar: {
      borderRadius: 15,
      columnWidth: "15px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

// Données pour lineChartData (Employés Actifs, Employés en Congé, Employés Affectés Récemment)
export const lineChartData = [
  {
    name: "Employés Actifs",
    data: [45, 47, 50, 52, 49, 51, 53, 52, 50, 48, 49, 51],
  },
  {
    name: "Employés en Congé",
    data: [5, 3, 6, 4, 7, 5, 6, 5, 4, 3, 4, 3],
  },
  {
    name: "Employés Affectés Récemment",
    data: [2, 3, 1, 4, 2, 3, 4, 5, 2, 3, 4, 3],
  },
];

// Options pour lineChartOptions
export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,  // Épaisseur de la ligne pour une meilleure visibilité
  },
  xaxis: {
    type: "category",
    categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Août", "Sep", "Oct", "Nov", "Déc"],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
    min: 0,
    max: 60,  // Ajustement pour que les données soient bien visibles
    tickAmount: 6,  // Intervalle pour que la courbe soit fluide
  },
  legend: {
    show: true,
    labels: {
      colors: "#fff",
    },
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#fff", "#3182CE", "#38A169"],
  },
  colors: ["#fff", "#3182CE", "#38A169"],
};
