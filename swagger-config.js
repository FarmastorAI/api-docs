let currentSwaggerUI = null;

// Инициализация с первым сервисом
document.addEventListener('DOMContentLoaded', function() {
    const firstBtn = document.querySelector('.service-btn.active');
    loadSwagger('services/api_vchasno.yaml', firstBtn);
});

function loadSwagger(specUrl, btn) {
    const swaggerContainer = document.getElementById('swagger-ui');
    swaggerContainer.innerHTML = '';

    currentSwaggerUI = SwaggerUIBundle({
        url: specUrl,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset  // ← ВАЖНО! НЕ SwaggerUIBundle.presets.standalone
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        tryItOutEnabled: true,
        requestInterceptor: (request) => {
            request.headers['Authorization'] = 'Bearer YOUR_TOKEN_HERE';
            return request;
        },
        responseInterceptor: (response) => {
            console.log('API Response:', response);
            return response;
        }
    });

    document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// Функция для добавления нового сервиса динамически
function addNewService(name, specUrl, icon = '🔧') {
    const buttonsContainer = document.querySelector('.service-buttons');
    const newButton = document.createElement('button');
    newButton.className = 'service-btn';
    newButton.innerHTML = `${icon} ${name}`;
    newButton.onclick = function() { loadSwagger(specUrl, newButton); };
    buttonsContainer.appendChild(newButton);
}
