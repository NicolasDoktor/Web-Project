# ARC Raiders - Jednoduchý Python server
# Školní projekt - Flask backend pro načítání dat

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__, static_folder='..', static_url_path='')
CORS(app)

# Cesta k datům
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Načtení JSON souboru
def nacti_json(nazev_souboru):
    try:
        cesta = os.path.join(DATA_DIR, nazev_souboru)
        with open(cesta, 'r', encoding='utf-8') as soubor:
            return json.load(soubor)
    except:
        return None

# Hlavní stránka
@app.route('/')
def index():
    return send_from_directory('..', 'index.html')

# API pro třídy
@app.route('/api/classes', methods=['GET'])
def ziskej_tridy():
    tridy = nacti_json('classes.json')
    if tridy is None:
        return jsonify({'error': 'Nepodařilo se načíst třídy'}), 500
    return jsonify(tridy)

# API pro novinky
@app.route('/api/news', methods=['GET'])
def ziskej_novinky():
    novinky = nacti_json('news.json')
    if novinky is None:
        return jsonify({'error': 'Nepodařilo se načíst novinky'}), 500
    return jsonify(novinky)

# API pro zbraně
@app.route('/api/weapons', methods=['GET'])
def ziskej_zbrane():
    zbrane = nacti_json('weapons.json')
    if zbrane is None:
        return jsonify({'error': 'Nepodařilo se načíst zbraně'}), 500
    return jsonify(zbrane)

# Kontaktní formulář
@app.route('/api/contact', methods=['POST'])
def kontakt():
    data = request.get_json()
    
    # Kontrola povinných polí
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'error': 'Chybějící povinná pole'}), 400
    
    # V demo režimu jen vypíšeme zprávu
    print('Přijata zpráva:')
    print(f"Jméno: {data.get('name')}")
    print(f"Email: {data.get('email')}")
    print(f"Předmět: {data.get('subject')}")
    print(f"Zpráva: {data.get('message')}")
    
    return jsonify({'success': True, 'message': 'Zpráva odeslána!'}), 200

# Spuštění serveru
if __name__ == '__main__':
    print('=' * 50)
    print('ARC Raiders Server')
    print('=' * 50)
    print('Server běží na: http://localhost:5000')
    print('=' * 50)
    print('\nDostupná API:')
    print('  GET  /api/classes   - Herní třídy')
    print('  GET  /api/news      - Novinky')
    print('  GET  /api/weapons   - Zbraně')
    print('  POST /api/contact   - Kontaktní formulář')
    print('=' * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
