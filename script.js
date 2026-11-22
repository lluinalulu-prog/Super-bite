// Автоматически ставим сегодняшнюю дату по умолчанию в календаре
const dateInput = document.getElementById('visit-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
}

// --- Логика бронирования билетов ---
document.getElementById('ticket-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('guest-name').value;
    const rawDate = document.getElementById('visit-date').value;
    const time = document.getElementById('visit-time').value;
    const type = document.getElementById('ticket-type').value;
    const count = document.getElementById('guests-count').value;

    // Красивый формат даты (ДД.ММ.ГГГГ)
    const formattedDate = rawDate.split('-').reverse().join('.');
    const randomCode = '#SB-' + Math.floor(1000 + Math.random() * 9000);

    document.getElementById('res-name').textContent = name;
    document.getElementById('res-date').textContent = formattedDate;
    document.getElementById('res-time').textContent = time;
    document.getElementById('res-type').textContent = type;
    document.getElementById('res-count').textContent = count;
    document.getElementById('res-code').textContent = randomCode;

    const resultBox = document.getElementById('ticket-result');
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth' });
});

// --- Логика отзывов ---
const defaultReviews = [
    {
        author: "Крис",
        rating: "★★★★★",
        date: "20.11.2026",
        text: "Праздновали день рождения! Аврора потрясающе танцует с детьми, а Лео сыграл крутое соло на гитаре. Лучшая пицца в городе!"
    },
    {
        author: "Охранник Джереми",
        rating: "★★★☆☆",
        date: "21.11.2026",
        text: "Днем ресторан супер, Шторм очень вежливый ведущий. Но почему в 00:00 мне кажется, что он смотрит прямо в камеру?!"
    }
];

let reviews = JSON.parse(localStorage.getItem('superBiteReviews')) || defaultReviews;

function renderReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = '';

    reviews.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'review-card';

        const header = document.createElement('div');
        header.className = 'review-header';

        const authorEl = document.createElement('strong');
        authorEl.textContent = rev.author;

        const starsEl = document.createElement('span');
        starsEl.className = 'review-stars';
        starsEl.textContent = rev.rating;

        header.appendChild(authorEl);
        header.appendChild(starsEl);

        const dateEl = document.createElement('div');
        dateEl.className = 'review-date';
        dateEl.textContent = rev.date;

        const textEl = document.createElement('p');
        textEl.textContent = rev.text;

        card.appendChild(header);
        card.appendChild(dateEl);
        card.appendChild(textEl);

        list.appendChild(card);
    });
}

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const author = document.getElementById('review-author').value;
    const rating = document.getElementById('review-rating').value;
    const text = document.getElementById('review-text').value;
    const today = new Date().toLocaleDateString('ru-RU');

    reviews.unshift({ author, rating, date: today, text });
    localStorage.setItem('superBiteReviews', JSON.stringify(reviews));

    renderReviews();
    this.reset();
});

renderReviews();
