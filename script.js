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
        this.cards = document.querySelectorAll('.doctor-card');
        this.currentCardIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.initialTransform = '';
        
        // Данные о врачах с локальными фотографиями
        this.doctorsData = [
            {
                id: 1,
                name: 'Иван Иванов',
                specialty: 'Невролог',
                experience: '8 лет',
                description: 'Специалист по диагностике и лечению заболеваний нервной системы. Владеет современными методами лечения.',
                price: '2 500 ₽',
                photo: 'doctor1.jpg',
                slots: ['10:00', '12:30', '15:00']
            },
            {
                id: 2,
                name: 'Ольга Петрова',
                specialty: 'Невролог',
                experience: '12 лет',
                description: 'Врач высшей категории. Специализируется на лечении мигрени, невралгии и вегетососудистой дистонии.',
                price: '3 200 ₽',
                photo: 'doctor2.jpg',
                slots: ['09:00', '11:30', '14:00']
            },
            {
                id: 3,
                name: 'Ольга Смирнова',
                specialty: 'Невролог',
                experience: '15 лет',
                description: 'Доктор медицинских наук. Эксперт в области нейрореабилитации и лечения инсультов.',
                price: '4 500 ₽',
                photo: 'doctor3.jpg',
                slots: ['08:30', '13:00', '16:30']
            }
        ];
        
        this.selectedDoctor = null;
        this.selectedTime = null;
        
        this.init();
    }

    init() {
        this.showCurrentCard();
        this.setupEventListeners();
        this.setupButtonListeners();
        this.setupModalEventListeners();
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
        this.cards.forEach(card => {
            // События мыши
            card.addEventListener('mousedown', this.handleMouseDown.bind(this));
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));

            // События касания для мобильных устройств
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });

            // Предотвращаем контекстное меню
            card.addEventListener('contextmenu', e => e.preventDefault());
        });
    }

    setupButtonListeners() {
        const likeBtn = document.getElementById('likeBtn');
        const dislikeBtn = document.getElementById('dislikeBtn');

        likeBtn.addEventListener('click', () => this.swipeCard('right'));
        dislikeBtn.addEventListener('click', () => this.swipeCard('left'));
    }

    setupModalEventListeners() {
        // Закрытие модальных окон
        document.getElementById('closeSlotsModal').addEventListener('click', () => this.closeModal('slotsModal'));
        document.getElementById('closeBookingModal').addEventListener('click', () => this.closeModal('bookingModal'));
        document.getElementById('closeSuccessModal').addEventListener('click', () => this.closeModal('successModal'));
        
        // Кнопка "Назад к слотам"
        document.getElementById('backToSlots').addEventListener('click', () => this.showSlotsModal());
        
        // Кнопка "Завершить"
        document.getElementById('finishBooking').addEventListener('click', () => this.finishBooking());
        
        // Форма записи
        document.getElementById('bookingForm').addEventListener('submit', (e) => this.handleBookingSubmit(e));
        
        // Закрытие модальных окон при клике вне их
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    handleMouseDown(e) {
        const card = e.currentTarget;
        if (!card.classList.contains('active')) return;

        this.startDragging(e.clientX, e.clientY, card);
    }

    handleTouchStart(e) {
        const card = e.currentTarget;
        if (!card.classList.contains('active')) return;

        const touch = e.touches[0];
        this.startDragging(touch.clientX, touch.clientY, card);
        e.preventDefault();
    }

    startDragging(startX, startY, card) {
        this.isDragging = true;
        this.startX = startX;
        this.startY = startY;
        this.currentX = startX;
        this.currentY = startY;
        
        card.classList.add('dragging');
        this.initialTransform = card.style.transform;
        
        // Добавляем плавность
        card.style.transition = 'none';
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.updateDrag(e.clientX, e.clientY);
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        const touch = e.touches[0];
        this.updateDrag(touch.clientX, touch.clientY);
        e.preventDefault();
    }

    updateDrag(currentX, currentY) {
        this.currentX = currentX;
        this.currentY = currentY;

        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Ограничиваем вертикальное движение
        const limitedDeltaY = deltaY * 0.3;
        
        // Вычисляем угол поворота на основе горизонтального движения
        const rotation = deltaX * 0.1;
        
        // Применяем трансформацию
        const activeCard = document.querySelector('.doctor-card.active');
        if (activeCard) {
            activeCard.style.transform = `translate(${deltaX}px, ${limitedDeltaY}px) rotate(${rotation}deg)`;
        }
    }

    handleMouseUp() {
        if (!this.isDragging) return;
        this.endDragging();
    }

    handleTouchEnd() {
        if (!this.isDragging) return;
        this.endDragging();
    }

    endDragging() {
        if (!this.isDragging) return;

        const activeCard = document.querySelector('.doctor-card.active');
        if (!activeCard) return;

        const deltaX = this.currentX - this.startX;
        const threshold = 100; // Минимальное расстояние для свайпа

        if (Math.abs(deltaX) > threshold) {
            // Свайп произошел
            const direction = deltaX > 0 ? 'right' : 'left';
            this.swipeCard(direction);
        } else {
            // Возвращаем карточку на место
            this.resetCard(activeCard);
        }

        this.isDragging = false;
        activeCard.classList.remove('dragging');
    }

    resetCard(card) {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = this.initialTransform;
        
        // Убираем inline стили после анимации
        setTimeout(() => {
            card.style.transition = '';
            card.style.transform = '';
        }, 300);
    }

    swipeCard(direction) {
        const activeCard = document.querySelector('.doctor-card.active');
        if (!activeCard) return;

        // Добавляем класс для анимации свайпа
        activeCard.classList.add(`swipe-${direction}`);
        
        // Убираем класс dragging
        activeCard.classList.remove('dragging');
        
        // Убираем inline стили
        activeCard.style.transition = '';
        activeCard.style.transform = '';

        if (direction === 'right') {
            // Показываем модальное окно выбора слотов
            this.showSlotsModal();
        } else {
            // Переходим к следующей карточке
            setTimeout(() => {
                this.nextCard();
            }, 300);
        }
    }

    showSlotsModal() {
        const currentDoctor = this.doctorsData[this.currentCardIndex];
        this.selectedDoctor = currentDoctor;
        
        // Заполняем информацию о враче
        document.getElementById('modalDoctorPhoto').src = currentDoctor.photo;
        document.getElementById('modalDoctorName').textContent = currentDoctor.name;
        document.getElementById('modalDoctorSpecialty').textContent = currentDoctor.specialty;
        document.getElementById('modalDoctorPrice').textContent = currentDoctor.price;
        
        // Создаем слоты времени
        const slotsGrid = document.getElementById('modalSlotsGrid');
        slotsGrid.innerHTML = '';
        
        currentDoctor.slots.forEach(time => {
            const slotBtn = document.createElement('button');
            slotBtn.className = 'time-slot';
            slotBtn.textContent = time;
            slotBtn.dataset.time = time;
            slotBtn.addEventListener('click', () => this.selectTimeSlot(time));
            slotsGrid.appendChild(slotBtn);
        });
        
        // Показываем модальное окно
        this.openModal('slotsModal');
    }

    selectTimeSlot(time) {
        this.selectedTime = time;
        this.showBookingModal();
    }

    showBookingModal() {
        // Заполняем детали записи
        document.getElementById('bookingDoctorName').textContent = this.selectedDoctor.name;
        document.getElementById('bookingTime').textContent = this.selectedTime;
        document.getElementById('bookingDate').textContent = this.getCurrentDate();
        document.getElementById('bookingPrice').textContent = this.selectedDoctor.price;
        
        // Очищаем предыдущие ошибки
        this.clearErrors();
        
        // Показываем модальное окно
        this.closeModal('slotsModal');
        this.openModal('bookingModal');
    }

    handleBookingSubmit(e) {
        e.preventDefault();
        
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        if (!phoneNumber) {
            this.showError('phoneNumber', 'Необходимо ввести номер телефона');
            return;
        }
        
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
    }

    finishBooking() {
        // Закрываем все модальные окна и переходим к следующей карточке
        this.closeModal('successModal');
        this.nextCard();
        
        // Сбрасываем выбранные данные
        this.selectedDoctor = null;
        this.selectedTime = null;
    }

    nextCard() {
        // Убираем классы свайпа с предыдущей карточки
        this.cards.forEach(card => {
            card.classList.remove('swipe-left', 'swipe-right');
        });

        // Переходим к следующей карточке
        this.currentCardIndex++;
        
        if (this.currentCardIndex >= this.cards.length) {
            // Все карточки просмотрены
            this.showEndMessage();
            return;
        }

        // Показываем следующую карточку
        this.showCurrentCard();
    }

    showEndMessage() {
        const cardsContainer = document.querySelector('.cards-container');
        const actionButtons = document.querySelector('.action-buttons');
        const instructions = document.querySelector('.swipe-instructions');

        // Скрываем кнопки и инструкции
        actionButtons.style.display = 'none';
        instructions.style.display = 'none';

        // Показываем сообщение о завершении
        const endMessage = document.createElement('div');
        endMessage.className = 'end-message';
        endMessage.innerHTML = `
            <div class="end-content">
                <h2>🎉 Все врачи просмотрены!</h2>
                <p>Вы просмотрели всех доступных неврологов.</p>
                <button class="restart-btn" onclick="location.reload()">Начать заново</button>
            </div>
        `;
        
        cardsContainer.innerHTML = '';
        cardsContainer.appendChild(endMessage);

        // Добавляем стили для сообщения о завершении
        const style = document.createElement('style');
        style.textContent = `
            .end-message {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                text-align: center;
            }
            .end-content h2 {
                color: #21A038;
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            .end-content p {
                color: #666;
                margin-bottom: 25px;
                font-size: 1.1rem;
            }
            .restart-btn {
                background: #21A038;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .restart-btn:hover {
                background: #1D8836;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    // Утилиты для модальных окон
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        
        // Принудительно центрируем модальное окно
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        
        // Добавляем класс show
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Дополнительная проверка центрирования
        setTimeout(() => {
            this.ensureModalCentered(modal);
        }, 10);
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        document.body.style.overflow = '';
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
        const errorElement = document.getElementById(fieldId.replace('Number', '') + 'Error');
        
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearErrors() {
        const phoneField = document.getElementById('phoneNumber');
        const phoneError = document.getElementById('phoneError');
        
        phoneField.classList.remove('error');
        if (phoneError) {
            phoneError.textContent = '';
        }
    }

    getCurrentDate() {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return today.toLocaleDateString('ru-RU', options);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new DoctorCardManager();
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
