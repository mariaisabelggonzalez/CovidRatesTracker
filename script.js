async function initDashboard() {
    try {
        // Fetch historical data (last 30 days)
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
        const data = await response.json();

        // Extract dates, cases, and deaths
        const labels = Object.keys(data.cases);
        const casesData = Object.values(data.cases);
        const deathsData = Object.values(data.deaths);

        // Update Stats Summary
        document.getElementById('totalCases').innerText = casesData[casesData.length - 1].toLocaleString();
        document.getElementById('totalDeaths').innerText = deathsData[deathsData.length - 1].toLocaleString();

        // Initialize Chart
        const ctx = document.getElementById('covidChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cases',
                        data: casesData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Deaths',
                        data: deathsData,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => value.toLocaleString()
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('stats').innerHTML = "<p>Failed to load data. Please try again later.</p>";
    }
}

initDashboard();
