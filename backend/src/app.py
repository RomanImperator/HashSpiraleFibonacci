from flask import Flask, request, jsonify, send_from_directory
from math import sqrt
from decimal import Decimal

class Hash:
    __MAX_BYTES = 64
    #__GOLDEN_RATIO = Decimal(2 / (1 + sqrt(5)))
    __GOLDEN_RATIO = (sqrt(5) - 1.0) / 2.0

    @staticmethod
    def __pad(x: str):
        x_byte_len = len(x.encode("utf-8"))
        x_bytes = []

        if x_byte_len > Hash.__MAX_BYTES:
                print(f"ERRORE. Il massimo di byte inseribili è {Hash.__MAX_BYTES}")
                return None
        else:
            for i in x:
                x_bytes += i.encode("utf-8")

            if x_byte_len < 64:
                by_to_add = 64 - len(x_bytes)
                for i in range(by_to_add): x_bytes.append(x_byte_len)

        return x_bytes
    # i = 10465407871100252160

    @staticmethod
    def make_hash(x: str):
        __padded_str = Hash.__pad(x)
        if __padded_str is None:
            print("ERRORE. Input non può essere 0")
            return None
        hash_x = 0x1111111111111111 # initial state
        for i in __padded_str:
            i = int(0x10000000000000000 * ((i * Hash.__GOLDEN_RATIO % 1))) # è il cuore dell'hash, (fibonacci multipllicative hashing)
            hash_x = hash_x ^ i
        
        hash_x = int(0x10000000000000000 * ((hash_x * Hash.__GOLDEN_RATIO % 1))) # un ciclo finale for good measure

        return hash_x

#---------------------------------------------------------------------

app = Flask(__name__, static_folder='.', static_url_path='')

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

# (facoltativo) route index
@app.get("/")
def root():
    return send_from_directory('.', 'index.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)