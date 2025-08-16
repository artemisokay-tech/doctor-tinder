document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для выбора специальности
    const specialtyItems = document.querySelectorAll('.specialty-item');
    
    specialtyItems.forEach(item => {
        item.addEventListener('click', function() {
            const specialty = this.getAttribute('data-specialty');
            console.log(`Выбрана специальность: ${specialty}`);
            
            // Переходим на страницу с врачами выбранной специальности
            // Передаем специальность через URL параметр
            window.location.href = `doctors.html?specialty=${encodeURIComponent(specialty)}`;
        });
    });

    // Добавляем hover эффекты для карточек специальностей
    specialtyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 20px rgba(33, 160, 56, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});
