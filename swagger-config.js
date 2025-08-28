let currentSwaggerUI = null;

// Инициализация с первым сервисом
document.addEventListener('DOMContentLoaded', function() {
    loadSwagger('services/user-service.yaml');
});

function loadSwagger(specUrl) {
    // Удаляем предыдущий экземпляр
    if (currentSwaggerUI) {
        const swaggerContainer = document.getElementById('swagger-ui');
        swaggerContainer.innerHTML = '';
    }
    
    // Создаем новый экземпляр Swagger UI
    currentSwaggerUI = SwaggerUIBundle({
        url: specUrl,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.presets.standalone
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        tryItOutEnabled: true,
        requestInterceptor: (request) => {
            // Добавляем базовые заголовки для всех запросов
            request.headers['Authorization'] = 'Bearer YOUR_TOKEN_HERE';
            return request;
        },
        responseInterceptor: (response) => {
            console.log('API Response:', response);
            return response;
        }
    });
    
    // Обновляем активную кнопку
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Функция для добавления нового сервиса динамически
function addNewService(name, specUrl, icon = '🔧') {
    const buttonsContainer = document.querySelector('.service-buttons');
    const newButton = document.createElement('button');
    newButton.className = 'service-btn';
    newButton.innerHTML = `${icon} ${name}`;
    newButton.onclick = () => loadSwagger(specUrl);
    buttonsContainer.appendChild(newButton);
}
