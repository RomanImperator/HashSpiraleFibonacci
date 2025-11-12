# backend/src/app.py
from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
from hash import Hash

# cartella frontend = .../HashSpiraleFibonacci/frontend
# cartella progetto = .../HashSpiraleFibonacci/
BASE_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = BASE_DIR / "frontend"

app = Flask(
    __name__,
    static_folder=str(FRONTEND_DIR),  # serve HTML/CSS/JS da frontend/
    static_url_path=""                # li espone dalla root "/"
)

@app.post("/api/hash")
def api_hash():
    data = request.get_json(silent=True) or {}
    plaintext = (data.get("plaintext") or "").strip()
    if not plaintext:
        return jsonify(error="plaintext mancante"), 400

    h = Hash.make_hash(plaintext)
    if h is None:
        return jsonify(error="Input troppo lungo: massimo 64 byte UTF-8"), 413

    return jsonify(hash=hex(h), bits=64)

@app.get("/")
def root():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.get("/hash")
def hash_page():
    return send_from_directory(FRONTEND_DIR, "hash.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
