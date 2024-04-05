document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const buttons = document.querySelectorAll('.button');
            const cardElements = document.querySelectorAll('.card-main');

            function updateDashboard(period) {
                const timeFrameText = period === 'daily' ? 'Last day' :
                                      period === 'weekly' ? 'Last week' : 'Last month';

                cardElements.forEach((card, index) => {
                    const activity = data[index];
                    const currentTimeframe = activity.timeframes[period];
                    card.querySelector('.hours').textContent = `${currentTimeframe.current}hrs`;
                    card.querySelector('.last').textContent = `${timeFrameText} - ${currentTimeframe.previous}hrs`;
                });
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const period = button.classList.contains('button-daily') ? 'daily' :
                                   button.classList.contains('button-weekly') ? 'weekly' : 'monthly';
                    updateDashboard(period);
                });
            });

            // Initialize with default timeframe, e.g., weekly
            updateDashboard('weekly');
        })
        .catch(error => console.error('Error loading the data:', error));
});
