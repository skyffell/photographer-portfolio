from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# File to store messages (instead of email)
MESSAGES_FILE = 'messages.json'

class ContactService:
    def __init__(self):
        self.messages_file = MESSAGES_FILE
    
    def save_message(self, form_data):
        try:
            # Create messages file if it doesn't exist
            if not os.path.exists(self.messages_file):
                with open(self.messages_file, 'w', encoding='utf-8') as f:
                    json.dump([], f)
            
            # Read existing messages
            with open(self.messages_file, 'r', encoding='utf-8') as f:
                messages = json.load(f)
            
            # Add new message
            new_message = {
                'id': len(messages) + 1,
                'timestamp': datetime.now().isoformat(),
                'name': form_data['name'],
                'email': form_data['email'],
                'phone': form_data.get('phone', ''),
                'service': form_data.get('service', ''),
                'message': form_data['message'],
                'read': False
            }
            
            messages.append(new_message)
            
            # Save back to file
            with open(self.messages_file, 'w', encoding='utf-8') as f:
                json.dump(messages, f, ensure_ascii=False, indent=2)
            
            # Print to console for demo
            print("=" * 50)
            print("📧 НОВОЕ СООБЩЕНИЕ С САЙТА")
            print("=" * 50)
            print(f"👤 Имя: {form_data['name']}")
            print(f"📧 Email: {form_data['email']}")
            print(f"📞 Телефон: {form_data.get('phone', 'Не указан')}")
            print(f"🎯 Услуга: {form_data.get('service', 'Не указана')}")
            print(f"💬 Сообщение: {form_data['message']}")
            print(f"🕒 Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("=" * 50)
            
            return True, "Сообщение успешно сохранено! Я свяжусь с вами в ближайшее время."
            
        except Exception as e:
            print(f"❌ Error saving message: {str(e)}")
            return False, f"Ошибка при сохранении сообщения: {str(e)}"

contact_service = ContactService()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "service": "Alex Vision API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def contact():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "message": "Данные не предоставлены"
            }), 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "message": f"Поле {field} обязательно для заполнения"
                }), 400
        
        # Save message
        success, message = contact_service.save_message(data)
        
        if success:
            return jsonify({
                "success": True,
                "message": message
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": message
            }), 500
            
    except Exception as e:
        print(f"❌ Contact error: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"Внутренняя ошибка сервера: {str(e)}"
        }), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Endpoint to view saved messages (for admin)"""
    try:
        if os.path.exists(MESSAGES_FILE):
            with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
                messages = json.load(f)
            return jsonify({
                "success": True,
                "messages": messages
            })
        else:
            return jsonify({
                "success": True,
                "messages": []
            })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error reading messages: {str(e)}"
        }), 500

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({
        "message": "API работает отлично!",
        "endpoints": {
            "health": "/api/health",
            "contact": "/api/contact",
            "messages": "/api/messages",
            "test": "/api/test"
        }
    })

if __name__ == '__main__':
    print("🚀 Starting Alex Vision API...")
    print("💾 Message storage: JSON FILE")
    print("🌐 API will be available at: http://localhost:5000")
    print("📋 Available endpoints:")
    print("   GET  /api/health    - Health check")
    print("   POST /api/contact   - Send message")
    print("   GET  /api/messages  - View messages (admin)")
    print("   GET  /api/test      - Test endpoint")
    print("\n💡 Messages will be saved to messages.json")
    app.run(debug=True, host='0.0.0.0', port=5000)