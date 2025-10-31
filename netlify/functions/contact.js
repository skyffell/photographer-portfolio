exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        // Здесь может быть логика отправки email
        // Например, через SendGrid, Mailgun и т.д.
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                message: 'Сообщение успешно отправлено' 
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false,
                error: 'Ошибка при отправке сообщения' 
            })
        };
    }
};  