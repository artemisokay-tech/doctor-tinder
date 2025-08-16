// Данные о врачах
const doctors = [
    {
        id: 1,
        name: "Иванова Анна Петровна",
        specialty: "Невролог, кандидат медицинских наук",
        rating: 5,
        reviews: 127,
        photo: "АП"
    },
    {
        id: 2,
        name: "Петров Сергей Александрович",
        specialty: "Невролог, врач высшей категории",
        rating: 5,
        reviews: 89,
        photo: "СП"
    },
    {
        id: 3,
        name: "Сидорова Елена Владимировна",
        specialty: "Невролог, доктор медицинских наук",
        rating: 4,
        reviews: 203,
        photo: "ЕС"
    },
    {
        id: 4,
        name: "Козлов Дмитрий Игоревич",
        specialty: "Невролог, заведующий отделением",
        rating: 5,
        reviews: 156,
        photo: "ДК"
    },
    {
        id: 5,
        name: "Морозова Ольга Сергеевна",
        specialty: "Невролог, детский невролог",
        rating: 4,
        reviews: 78,
        photo: "ОМ"
    }
];

// Функция для отображения звездочек рейтинга
function displayStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Функция для создания карточки врача
function createDoctorCard(doctor) {
    return `
        <div class="doctor-card">
            <div class="doctor-photo">${doctor.photo}</div>
            <div class="doctor-info">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-rating">
                    <div class="stars">${displayStars(doctor.rating)}</div>
                    <span class="reviews-count">${doctor.reviews} отзывов</span>
                </div>
                <div class="doctor-specialty">${doctor.specialty}</div>
            </div>
            <button class="book-button" onclick="bookAppointment(${doctor.id})">Записаться</button>
        </div>
    `;
}

// Функция для отображения всех врачей
function displayDoctors(doctorsToShow = doctors) {
    const container = document.getElementById('doctorsContainer');
    if (doctorsToShow.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-size: 1.1rem;">Врачи не найдены</p>';
        return;
    }
    
    container.innerHTML = doctorsToShow.map(doctor => createDoctorCard(doctor)).join('');
}

// Функция поиска врачей
function searchDoctors() {
    const locationInput = document.getElementById('locationInput').value.toLowerCase();
    
    if (!locationInput.trim()) {
        displayDoctors();
        return;
    }
    
    // Имитация поиска по региону (в реальном приложении здесь был бы API-запрос)
    const filteredDoctors = doctors.filter(doctor => {
        // Простая логика поиска - можно расширить
        return doctor.name.toLowerCase().includes(locationInput) || 
               doctor.specialty.toLowerCase().includes(locationInput);
    });
    
    displayDoctors(filteredDoctors);
}

// Функция записи на прием
function bookAppointment(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        alert(`Запись на прием к ${doctor.name}\n\nФункция записи будет доступна в полной версии сайта.`);
    }
}

// Функция для обработки Enter в поле поиска
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        searchDoctors();
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    // Отображаем всех врачей при загрузке страницы
    displayDoctors();
    
    // Добавляем обработчик для Enter в поле поиска
    document.getElementById('locationInput').addEventListener('keypress', handleSearchKeyPress);
    
    // Добавляем анимацию появления карточек
    const cards = document.querySelectorAll('.doctor-card, .review-card, .discount-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Дополнительная функциональность: фильтр по рейтингу
function filterByRating(minRating) {
    const filteredDoctors = doctors.filter(doctor => doctor.rating >= minRating);
    displayDoctors(filteredDoctors);
}

// Функция для показа всех врачей
function showAllDoctors() {
    displayDoctors();
}

// Добавляем обработчики для дополнительных фильтров (можно добавить в HTML)
// Например, кнопки для фильтрации по рейтингу

class DoctorCardManager {
    constructor() {
        this.cards = [];
        this.currentCardIndex = 0;
        this.selectedDoctor = null;
        this.selectedTime = null;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.initialTransform = '';
        
        // Данные врачей по специальностям
        this.doctorsBySpecialty = {
            'Терапевты': [
                {
                    id: 1,
                    name: 'Семенов Александр Сергеевич',
                    specialty: 'Терапевт',
                    experience: 'Опыт работы: 12 лет',
                    description: 'Врач высшей категории. Специалист по диагностике и лечению внутренних болезней.',
                    price: '2 000 ₽',
                    photo: 'therapist_1.jpg',
                    slots: ['09:00', '11:30', '14:00', '16:30']
                },
                {
                    id: 2,
                    name: 'Смагин Андрей Игоревич',
                    specialty: 'Терапевт',
                    experience: 'Опыт работы: 8 лет',
                    description: 'Молодой специалист с современным подходом к лечению. Специализируется на профилактике заболеваний.',
                    price: '1 800 ₽',
                    photo: 'therapist_2.jpg',
                    slots: ['10:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 3,
                    name: 'Сусь Анна Сергеевна',
                    specialty: 'Терапевт',
                    experience: 'Опыт работы: 15 лет',
                    description: 'Доктор медицинских наук. Эксперт в области кардиологии и пульмонологии.',
                    price: '2 500 ₽',
                    photo: 'therapist_3.jpg',
                    slots: ['08:30', '11:00', '13:30', '16:00']
                }
            ],
            'Педиатры': [
                {
                    id: 1,
                    name: 'Фомина Ольга Ивановна',
                    specialty: 'Педиатр',
                    experience: 'Опыт работы: 18 лет',
                    description: 'Врач высшей категории. Специалист по лечению детей всех возрастов.',
                    price: '2 200 ₽',
                    photo: 'pediatrician_1.jpg',
                    slots: ['09:00', '11:00', '14:00', '16:00']
                },
                {
                    id: 2,
                    name: 'Иванов Илья Степанович',
                    specialty: 'Педиатр',
                    experience: 'Опыт работы: 10 лет',
                    description: 'Молодой педиатр с современными методами диагностики и лечения.',
                    price: '1 900 ₽',
                    photo: 'pediatrician_2.jpg',
                    slots: ['10:00', '12:30', '15:00', '17:30']
                },
                {
                    id: 3,
                    name: 'Иосса Александр Владимирович',
                    specialty: 'Педиатр',
                    experience: 'Опыт работы: 20 лет',
                    description: 'Доктор медицинских наук. Эксперт в области детской кардиологии.',
                    price: '2 800 ₽',
                    photo: 'pediatrician_3.jpg',
                    slots: ['08:00', '10:30', '13:00', '15:30']
                }
            ],
            'Стоматологи': [
                {
                    id: 1,
                    name: 'Латвеев Юрий Викторович',
                    specialty: 'Стоматолог',
                    experience: 'Опыт работы: 14 лет',
                    description: 'Врач-стоматолог высшей категории. Специалист по терапевтической стоматологии.',
                    price: '3 500 ₽',
                    photo: 'dentist_1.jpg',
                    slots: ['09:00', '11:00', '14:00', '16:00']
                },
                {
                    id: 2,
                    name: 'Пражкин Кирилл Анатольевич',
                    specialty: 'Стоматолог',
                    experience: 'Опыт работы: 9 лет',
                    description: 'Молодой стоматолог-ортопед. Специализируется на протезировании и имплантации.',
                    price: '4 200 ₽',
                    photo: 'dentist_2.jpg',
                    slots: ['10:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 3,
                    name: 'Надеждина Анастасия Ивановна',
                    specialty: 'Стоматолог',
                    experience: 'Опыт работы: 16 лет',
                    description: 'Врач-стоматолог-хирург. Эксперт в области хирургической стоматологии.',
                    price: '5 000 ₽',
                    photo: 'dentist_3.jpg',
                    slots: ['08:30', '11:30', '14:30', '16:30']
                }
            ],
            'Хирурги': [
                {
                    id: 1,
                    name: 'Резакова Ольга Петровна',
                    specialty: 'Хирург',
                    experience: 'Опыт работы: 22 года',
                    description: 'Врач-хирург высшей категории. Специалист по общей хирургии.',
                    price: '4 500 ₽',
                    photo: 'surgeon_1.jpg',
                    slots: ['09:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 2,
                    name: 'Зашивалов Артем Борисович',
                    specialty: 'Хирург',
                    experience: 'Опыт работы: 11 лет',
                    description: 'Молодой хирург-онколог. Специализируется на малоинвазивных операциях.',
                    price: '5 500 ₽',
                    photo: 'surgeon_2.jpg',
                    slots: ['10:00', '13:00', '16:00', '18:00']
                },
                {
                    id: 3,
                    name: 'Норкина Алла Борисовна',
                    specialty: 'Хирург',
                    experience: 'Опыт работы: 25 лет',
                    description: 'Доктор медицинских наук. Эксперт в области сосудистой хирургии.',
                    price: '6 000 ₽',
                    photo: 'surgeon_3.jpg',
                    slots: ['08:00', '11:00', '14:00', '16:00']
                }
            ],
            'Кардиологи': [
                {
                    id: 1,
                    name: 'Сквошина Анастасия Ивановна',
                    specialty: 'Кардиолог',
                    experience: 'Опыт работы: 16 лет',
                    description: 'Врач-кардиолог высшей категории. Специалист по диагностике сердечно-сосудистых заболеваний.',
                    price: '4 000 ₽',
                    photo: 'cardiologist_1.jpg',
                    slots: ['09:00', '11:30', '14:00', '16:30']
                },
                {
                    id: 2,
                    name: 'Лобанов Сергей Сергеевич',
                    specialty: 'Кардиолог',
                    experience: 'Опыт работы: 19 лет',
                    description: 'Доктор медицинских наук. Эксперт в области интервенционной кардиологии.',
                    price: '5 500 ₽',
                    photo: 'cardiologist_2.jpg',
                    slots: ['10:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 3,
                    name: 'Пульсин Глеб Валентинович',
                    specialty: 'Кардиолог',
                    experience: 'Опыт работы: 13 лет',
                    description: 'Молодой кардиолог. Специализируется на лечении аритмий.',
                    price: '3 800 ₽',
                    photo: 'cardiologist_3.jpg',
                    slots: ['08:30', '11:00', '13:30', '16:00']
                }
            ],
            'Онкологи': [
                {
                    id: 1,
                    name: 'Путев Игнат Джанбекович',
                    specialty: 'Онколог',
                    experience: 'Опыт работы: 20 лет',
                    description: 'Врач-онколог высшей категории. Специалист по диагностике и лечению рака.',
                    price: '6 000 ₽',
                    photo: 'oncologist_1.jpg',
                    slots: ['09:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 2,
                    name: 'Зарубина Яна Антоновна',
                    specialty: 'Онколог',
                    experience: 'Опыт работы: 14 лет',
                    description: 'Молодой онколог-химиотерапевт. Специализируется на таргетной терапии.',
                    price: '5 200 ₽',
                    photo: 'oncologist_2.jpg',
                    slots: ['10:00', '13:00', '16:00', '18:00']
                },
                {
                    id: 3,
                    name: 'Байцаев Заурбек Юрьевич',
                    specialty: 'Онколог',
                    experience: 'Опыт работы: 28 лет',
                    description: 'Доктор медицинских наук. Эксперт в области хирургической онкологии.',
                    price: '7 500 ₽',
                    photo: 'oncologist_3.jpg',
                    slots: ['08:00', '11:00', '14:00', '16:00']
                }
            ],
            'Эндокринологи': [
                {
                    id: 1,
                    name: 'Защитина Елизавета Павловна',
                    specialty: 'Эндокринолог',
                    experience: 'Опыт работы: 17 лет',
                    description: 'Врач-эндокринолог высшей категории. Специалист по лечению сахарного диабета.',
                    price: '3 800 ₽',
                    photo: 'endocrinologist_1.jpg',
                    slots: ['09:00', '11:30', '14:00', '16:30']
                },
                {
                    id: 2,
                    name: 'Трубин Михаил Семенович',
                    specialty: 'Эндокринолог',
                    experience: 'Опыт работы: 12 лет',
                    description: 'Молодой эндокринолог. Специализируется на заболеваниях щитовидной железы.',
                    price: '3 200 ₽',
                    photo: 'endocrinologist_2.jpg',
                    slots: ['10:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 3,
                    name: 'Бжассо Виктор Альбертович',
                    specialty: 'Эндокринолог',
                    experience: 'Опыт работы: 23 года',
                    description: 'Доктор медицинских наук. Эксперт в области детской эндокринологии.',
                    price: '4 500 ₽',
                    photo: 'endocrinologist_3.jpg',
                    slots: ['08:30', '11:00', '13:30', '16:00']
                }
            ],
            'Нейрохирурги': [
                {
                    id: 1,
                    name: 'Старков Антон Михаилович',
                    specialty: 'Нейрохирург',
                    experience: 'Опыт работы: 21 год',
                    description: 'Врач-нейрохирург высшей категории. Специалист по операциям на головном мозге.',
                    price: '8 000 ₽',
                    photo: 'neurosurgeon_1.jpg',
                    slots: ['09:00', '12:00', '15:00', '17:00']
                },
                {
                    id: 2,
                    name: 'Сторин Семен Артемович',
                    specialty: 'Нейрохирург',
                    experience: 'Опыт работы: 15 лет',
                    description: 'Молодой нейрохирург. Специализируется на малоинвазивных операциях на позвоночнике.',
                    price: '6 500 ₽',
                    photo: 'neurosurgeon_2.jpg',
                    slots: ['10:00', '13:00', '16:00', '18:00']
                },
                {
                    id: 3,
                    name: 'Алабамова Алла Борисовна',
                    specialty: 'Нейрохирург',
                    experience: 'Опыт работы: 26 лет',
                    description: 'Доктор медицинских наук. Эксперт в области сосудистой нейрохирургии.',
                    price: '9 000 ₽',
                    photo: 'neurosurgeon_3.jpg',
                    slots: ['08:00', '11:00', '14:00', '16:00']
                }
            ]
        };
        
        this.init();
    }

    init() {
        // Получаем выбранную специальность из URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedSpecialty = urlParams.get('specialty');
        
        if (!selectedSpecialty || !this.doctorsBySpecialty[selectedSpecialty]) {
            // Если специальность не выбрана или не найдена, возвращаемся на главную
            window.location.href = 'index.html';
            return;
        }
        
        // Обновляем заголовок страницы
        document.title = `СберЗдоровье - ${selectedSpecialty}`;
        
        // Получаем врачей для выбранной специальности
        const doctors = this.doctorsBySpecialty[selectedSpecialty];
        
        // Создаем карточки врачей динамически
        this.createDoctorCards(doctors);
        
        // Настраиваем обработчики событий
        this.setupEventListeners();
        
        // Показываем первую карточку
        if (this.cards.length > 0) {
            this.cards[0].classList.add('active');
        }
    }

    createDoctorCards(doctors) {
        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = ''; // Очищаем контейнер
        
        doctors.forEach((doctor, index) => {
            const card = document.createElement('div');
            card.className = `doctor-card ${index === 0 ? 'active' : ''}`;
            card.setAttribute('data-doctor', doctor.id);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${doctor.photo}" alt="${doctor.name}">
                </div>
                <div class="card-content">
                    <h2 class="doctor-name">${doctor.name}</h2>
                    <p class="doctor-specialty">${doctor.specialty}</p>
                    <p class="doctor-experience">${doctor.experience}</p>
                    <p class="doctor-description">${doctor.description}</p>
                    <div class="price-section">
                        <span class="price">${doctor.price}</span>
                        <span class="price-label">за приём</span>
                    </div>
                    <div class="time-slots">
                        <h3>Свободные слоты на сегодня:</h3>
                        <div class="slots">
                            ${doctor.slots.map(slot => `<button class="time-slot" data-time="${slot}">${slot}</button>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Добавляем обработчики событий для карточки
            card.addEventListener('mousedown', this.handleMouseDown.bind(this));
            card.addEventListener('contextmenu', e => e.preventDefault());
            
            cardsContainer.appendChild(card);
            this.cards.push(card);
        });
        
        // Добавляем глобальные обработчики для мыши и касаний
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    showCurrentCard() {
        // Скрываем все карточки
        this.cards.forEach((card, index) => {
            if (index === this.currentCardIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Обработчики для кнопок свайпа
        document.getElementById('dislikeBtn').addEventListener('click', () => {
            this.swipeCard('left');
        });
        
        document.getElementById('likeBtn').addEventListener('click', () => {
            this.swipeCard('right');
        });

        // Обработчики для модальных окон
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
        // Обработчики для модальных окон
        document.getElementById('closeSlotsModal').addEventListener('click', () => {
            this.closeModal('slotsModal');
        });
        
        document.getElementById('closeBookingModal').addEventListener('click', () => {
            this.closeModal('bookingModal');
        });
        
        document.getElementById('closeSuccessModal').addEventListener('click', () => {
            this.closeModal('successModal');
        });
        
        document.getElementById('backToSlots').addEventListener('click', () => {
            this.closeModal('bookingModal');
            this.showSlotsModal();
        });
        
        document.getElementById('finishBooking').addEventListener('click', () => {
            this.finishBooking();
        });
        
        // Обработчик для формы записи
        document.getElementById('bookingForm').addEventListener('submit', (e) => {
            this.handleBookingSubmit(e);
        });
        
        // Настраиваем маску для номера телефона
        this.setupPhoneMask();
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupPhoneMask() {
        const phoneInput = document.getElementById('phoneNumber');
        
        // Устанавливаем начальное значение
        phoneInput.value = '+7 (';
        
        // Обработчик ввода
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Убираем все нецифры
            
            // Ограничиваем до 11 цифр (7 + 10 цифр номера)
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Форматируем номер
            let formattedValue = '+7 (';
            
            if (value.length > 1) { // Пропускаем первую 7 (код страны)
                const phoneDigits = value.substring(1); // Берем только цифры номера
                
                if (phoneDigits.length > 0) {
                    // Добавляем код оператора
                    formattedValue += phoneDigits.substring(0, 3);
                    
                    if (phoneDigits.length > 3) {
                        formattedValue += ') ';
                        formattedValue += phoneDigits.substring(3, 6);
                        
                        if (phoneDigits.length > 6) {
                            formattedValue += '-';
                            formattedValue += phoneDigits.substring(6, 8);
                            
                            if (phoneDigits.length > 8) {
                                formattedValue += '-';
                                formattedValue += phoneDigits.substring(8, 10);
                            }
                        }
                    }
                }
            }
            
            e.target.value = formattedValue;
        });
        
        // Обработчик удаления
        phoneInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                const value = e.target.value;
                const cursorPosition = e.target.selectionStart;
                
                // Если курсор находится в начале, не даем удалить +7
                if (cursorPosition <= 4) {
                    e.preventDefault();
                    return;
                }
            }
        });
        
        // Обработчик вставки
        phoneInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pastedText.replace(/\D/g, '').substring(0, 11);
            
            if (digits.length > 0) {
                // Если вставляем номер без кода страны, добавляем 7
                let fullDigits = digits;
                if (digits.length === 10) {
                    fullDigits = '7' + digits;
                }
                
                phoneInput.value = this.formatPhoneNumber(fullDigits);
                phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
            }
        });
        
        // Обработчик клика - устанавливаем курсор в правильное место
        phoneInput.addEventListener('click', (e) => {
            const value = e.target.value;
            const cursorPosition = e.target.selectionStart;
            
            // Если курсор находится в служебных символах, перемещаем его
            if (cursorPosition <= 4) { // +7 (
                e.target.setSelectionRange(4, 4);
            } else if (cursorPosition === 6) { // после )
                e.target.setSelectionRange(7, 7);
            } else if (cursorPosition === 10) { // после первого пробела
                e.target.setSelectionRange(11, 11);
            } else if (cursorPosition === 14) { // после первого дефиса
                e.target.setSelectionRange(15, 15);
            } else if (cursorPosition === 17) { // после второго дефиса
                e.target.setSelectionRange(18, 18);
            }
        });
        
        // Обработчик фокуса - устанавливаем курсор в конец
        phoneInput.addEventListener('focus', (e) => {
            const value = e.target.value;
            if (value === '+7 (') {
                e.target.setSelectionRange(4, 4);
            } else {
                e.target.setSelectionRange(value.length, value.length);
            }
        });
        
        // Обработчик потери фокуса - проверяем корректность
        phoneInput.addEventListener('blur', (e) => {
            const value = e.target.value;
            const digits = value.replace(/\D/g, '');
            
            if (digits.length === 0) {
                e.target.value = '+7 (';
            }
        });
    }

    formatPhoneNumber(digits) {
        let formattedValue = '+7 (';
        
        if (digits.length > 1) { // Пропускаем первую 7 (код страны)
            const phoneDigits = digits.substring(1); // Берем только цифры номера
            
            if (phoneDigits.length > 0) {
                // Добавляем код оператора
                formattedValue += phoneDigits.substring(0, 3);
                
                if (phoneDigits.length > 3) {
                    formattedValue += ') ';
                    formattedValue += phoneDigits.substring(3, 6);
                    
                    if (phoneDigits.length > 6) {
                        formattedValue += '-';
                        formattedValue += phoneDigits.substring(6, 8);
                        
                        if (phoneDigits.length > 8) {
                            formattedValue += '-';
                            formattedValue += phoneDigits.substring(8, 10);
                        }
                    }
                }
            }
        }
        
        return formattedValue;
    }

    swipeCard(direction) {
        const activeCard = document.querySelector('.doctor-card.active');
        if (!activeCard) return;
        
        if (direction === 'right') {
            activeCard.classList.add('swipe-right');
            activeCard.style.transform = 'translateX(100vw)';
            activeCard.style.transition = 'transform 0.5s ease-out';
            
            // Показываем модальное окно выбора слотов
            setTimeout(() => {
                this.showSlotsModal();
            }, 500);
        } else {
            activeCard.classList.add('swipe-left');
            activeCard.style.transform = 'translateX(-100vw)';
            activeCard.style.transition = 'transform 0.5s ease-out';
            
            // Переходим к следующей карточке
            setTimeout(() => {
                this.nextCard();
            }, 500);
        }
    }

    nextCard() {
        const activeCard = document.querySelector('.doctor-card.active');
        if (activeCard) {
            activeCard.classList.remove('active');
        }
        
        this.currentCardIndex++;
        
        if (this.currentCardIndex >= this.cards.length) {
            // Все карточки просмотрены, возвращаемся на главную
            window.location.href = 'index.html';
            return;
        }
        
        // Показываем следующую карточку
        if (this.cards[this.currentCardIndex]) {
            this.cards[this.currentCardIndex].classList.add('active');
        }
        
        // Сбрасываем стили предыдущей карточки
        if (activeCard) {
            activeCard.classList.remove('swipe-left', 'swipe-right');
            activeCard.style.transform = '';
            activeCard.style.transition = '';
        }
    }

    // Методы для обработки свайпа мышью и касанием
    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.currentX = this.startX;
        this.initialTransform = '';
        
        const activeCard = document.querySelector('.doctor-card.active');
        if (activeCard) {
            this.initialTransform = activeCard.style.transform;
        }
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        this.updateDrag();
    }

    handleMouseUp() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.handleDragEnd();
    }

    handleTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
        this.initialTransform = '';
        
        const activeCard = document.querySelector('.doctor-card.active');
        if (activeCard) {
            this.initialTransform = activeCard.style.transform;
        }
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        this.currentX = e.touches[0].clientX;
        this.updateDrag();
    }

    handleTouchEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.handleDragEnd();
    }

    updateDrag() {
        const activeCard = document.querySelector('.doctor-card.active');
        if (!activeCard) return;
        
        const deltaX = this.currentX - this.startX;
        const translateX = deltaX;
        
        activeCard.style.transform = `translateX(${translateX}px)`;
    }

    handleDragEnd() {
        const activeCard = document.querySelector('.doctor-card.active');
        if (!activeCard) return;
        
        const deltaX = this.currentX - this.startX;
        const threshold = 100; // Минимальное расстояние для свайпа
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                this.swipeCard('right');
            } else {
                this.swipeCard('left');
            }
        } else {
            // Возвращаем карточку на место
            activeCard.style.transform = this.initialTransform || '';
        }
    }

    showSlotsModal() {
        const currentDoctor = this.doctorsBySpecialty[this.getCurrentSpecialty()][this.currentCardIndex];
        this.selectedDoctor = currentDoctor;
        
        // Заполняем информацию о враче в модальном окне
        document.getElementById('modalDoctorPhoto').src = currentDoctor.photo;
        document.getElementById('modalDoctorName').textContent = currentDoctor.name;
        document.getElementById('modalDoctorSpecialty').textContent = currentDoctor.specialty;
        document.getElementById('modalDoctorPrice').textContent = currentDoctor.price;
        
        // Создаем сетку слотов
        const slotsGrid = document.getElementById('modalSlotsGrid');
        slotsGrid.innerHTML = '';
        
        currentDoctor.slots.forEach(slot => {
            const slotButton = document.createElement('button');
            slotButton.className = 'time-slot-btn';
            slotButton.textContent = slot;
            slotButton.addEventListener('click', () => this.selectTimeSlot(slot));
            slotsGrid.appendChild(slotButton);
        });
        
        // Показываем модальное окно
        this.openModal('slotsModal');
    }

    selectTimeSlot(time) {
        this.selectedTime = time;
        this.showBookingModal();
    }

    getCurrentSpecialty() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('specialty');
    }

    showBookingModal() {
        // Заполняем детали записи
        document.getElementById('bookingDoctorName').textContent = this.selectedDoctor.name;
        document.getElementById('bookingTime').textContent = this.selectedTime;
        document.getElementById('bookingDate').textContent = this.getCurrentDate();
        document.getElementById('bookingPrice').textContent = this.selectedDoctor.price;
        
        // Показываем модальное окно
        this.closeModal('slotsModal');
        this.openModal('bookingModal');
    }

    handleBookingSubmit(event) {
        event.preventDefault();
        
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        // Проверяем, что номер соответствует формату +7 (XXX) XXX-XX-XX
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        
        if (!phoneNumber) {
            this.showError('phoneNumber', 'Необходимо ввести номер телефона');
            return;
        }
        
        if (!phoneRegex.test(phoneNumber)) {
            this.showError('phoneNumber', 'Номер должен быть в формате +7 (XXX) XXX-XX-XX');
            return;
        }
        
        // Дополнительная проверка на 11 цифр
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.length !== 11) {
            this.showError('phoneNumber', 'Номер должен содержать 11 цифр (включая код страны 7)');
            return;
        }
        
        // Очищаем ошибки
        this.clearErrors();
        
        // Показываем экран успеха
        this.showSuccessModal(phoneNumber);
    }

    showSuccessModal(phoneNumber) {
        // Заполняем детали успешной записи
        document.getElementById('successDoctorName').textContent = this.selectedDoctor.name;
        document.getElementById('successSpecialty').textContent = this.selectedDoctor.specialty;
        document.getElementById('successDateTime').textContent = `${this.getCurrentDate()} в ${this.selectedTime}`;
        document.getElementById('successPrice').textContent = this.selectedDoctor.price;
        document.getElementById('successPhone').textContent = phoneNumber;
        
        // Показываем модальное окно
        this.closeModal('bookingModal');
        this.openModal('successModal');
        
        // Запускаем анимацию конфетти
        this.startConfetti();
    }

    finishBooking() {
        // Останавливаем конфетти
        this.stopConfetti();
        
        // Закрываем все модальные окна
        this.closeModal('successModal');
        
        // Возвращаемся на главную страницу выбора специальности
        window.location.href = 'index.html';
    }

    showEndMessage() {
        // Показываем сообщение о том, что все врачи просмотрены
        const mainContent = document.querySelector('.main');
        mainContent.innerHTML = `
            <div class="end-message">
                <h2>Все врачи просмотрены</h2>
                <p>Вы просмотрели всех доступных врачей данной специальности.</p>
                <button class="btn-primary" onclick="window.location.href='index.html'">
                    Выбрать другую специальность
                </button>
            </div>
        `;
    }

    // Утилиты для модальных окон
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Если закрываем экран успеха, останавливаем конфетти
        if (modalId === 'successModal') {
            this.stopConfetti();
        }
        
        // Убираем класс show
        modal.classList.remove('show');
        
        // Восстанавливаем overflow для body
        document.body.style.overflow = '';
        
        // Если закрываем модальное окно выбора слотов, возвращаемся к карточке
        if (modalId === 'slotsModal') {
            // Возвращаем карточку на место, если она была свайпнута вправо
            const activeCard = document.querySelector('.doctor-card.active');
            if (activeCard && activeCard.classList.contains('swipe-right')) {
                activeCard.classList.remove('swipe-right');
                activeCard.style.transform = '';
                activeCard.style.transition = '';
            }
        }
        
        // Если закрываем форму записи, возвращаемся к выбору слотов
        if (modalId === 'bookingModal') {
            this.showSlotsModal();
        }
        
        // Если закрываем экран успеха, возвращаемся к форме записи
        if (modalId === 'successModal') {
            this.showBookingModal();
        }
    }

    ensureModalCentered(modal) {
        // Дополнительная проверка центрирования
        if (modal.style.display !== 'flex') {
            modal.style.display = 'flex';
        }
        if (modal.style.alignItems !== 'center') {
            modal.style.alignItems = 'center';
        }
        if (modal.style.justifyContent !== 'center') {
            modal.style.justifyContent = 'center';
        }
        
        // Проверяем позиционирование
        const rect = modal.getBoundingClientRect();
        if (rect.left !== 0 || rect.top !== 0) {
            modal.style.left = '0';
            modal.style.top = '0';
        }
    }

    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId.replace('Number', '') + 'Error');
        
        if (field && errorDiv) {
            field.classList.add('error');
            errorDiv.textContent = message;
        }
    }

    clearErrors() {
        const errorFields = document.querySelectorAll('.error');
        const errorMessages = document.querySelectorAll('.error-message');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(message => message.textContent = '');
    }

    getCurrentDate() {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    closeAllModals() {
        const modals = ['slotsModal', 'bookingModal', 'successModal'];
        modals.forEach(modalId => {
            this.closeModal(modalId);
        });
        
        // Сбрасываем выбранные данные
        this.selectedDoctor = null;
        this.selectedTime = null;
    }

    startConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.id = 'confetti-container';
        confettiContainer.className = 'confetti';
        document.body.appendChild(confettiContainer);

        const confettiColors = ['#FFD700', '#FFB700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500', '#FF3030'];
        const confettiShapes = ['⭐', '🎉', '🎊', '🎈', '🎀', '🎁', '🎈', '🎉'];

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px'; // Начинаем сверху экрана
            confetti.style.fontSize = '12px'; // Делаем эмодзи меньше
            confetti.style.zIndex = '9999';
            confettiContainer.appendChild(confetti);

            // Анимация падения вниз
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0px) rotate(0deg)',
                    opacity: 1 
                },
                { 
                    transform: 'translateY(100vh) rotate(360deg)',
                    opacity: 0 
                }
            ], {
                duration: 5000, // 5 секунд
                easing: 'ease-in'
            });

            // Удаляем конфетти после завершения анимации
            animation.onfinish = () => {
                confetti.remove();
            };
        }

        // Создаем конфетти каждые 200мс для более плавного эффекта
        const confettiInterval = setInterval(createConfetti, 200);

        // Останавливаем создание конфетти через 5 секунд
        setTimeout(() => {
            clearInterval(confettiInterval);
        }, 5000);
    }

    stopConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (confettiContainer) {
            confettiContainer.remove();
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    window.doctorCardManager = new DoctorCardManager();
});

// Добавляем обработчики для временных слотов на карточках (для демонстрации)
document.addEventListener('DOMContentLoaded', () => {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Убираем активный класс у всех слотов
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Добавляем активный класс к выбранному слоту
            this.classList.add('selected');
            
            // Показываем уведомление о записи
            showBookingNotification(this.textContent);
        });
    });
});

function showBookingNotification(time) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'booking-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>✅ Запись на приём</h3>
            <p>Вы записались на ${time}</p>
            <button class="close-notification" onclick="this.parentElement.parentElement.remove()">Закрыть</button>
        </div>
    `;
    
    // Добавляем стили для уведомления
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .booking-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                padding: 20px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }
            .notification-content h3 {
                color: #21A038;
                margin-bottom: 10px;
                font-size: 1.2rem;
            }
            .notification-content p {
                color: #666;
                margin-bottom: 15px;
            }
            .close-notification {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .close-notification:hover {
                background: #e9ecef;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .time-slot.selected {
                background: #21A038 !important;
                color: white !important;
                border-color: #21A038 !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Автоматически убираем уведомление через 5 секунд
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
