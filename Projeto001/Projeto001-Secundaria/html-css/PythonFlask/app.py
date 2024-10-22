from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS 

app = Flask(__name__)

# Configurações do MySQL
app.config['MYSQL_HOST'] = '127.0.0.1'  # Endereço do servidor MySQL (localhost)
app.config['MYSQL_USER'] = 'root'  # Usuário do MySQL
app.config['MYSQL_PASSWORD'] = 'teste123'  # Senha do usuário do MySQL
app.config['MYSQL_DB'] = 'primeiroprojeto'  # Nome do banco de dados

# Inicializando a conexão com o banco de dados
mysql = MySQL(app)

# Habilita CORS para permitir que o frontend faça chamadas ao backend
CORS(app)

# Método para adicionar um filme ao banco de dados
@app.route('/', methods=['POST'])
def add_filme_recomendados():
    dadosFilme = request.get_json()  # Corrigido aqui
    nome = dadosFilme['tituloDoFilme']
    genero = dadosFilme['generoFilme']
    ano = dadosFilme['anoFilme']
    imagem = dadosFilme['posterFilme']

    cur = mysql.connection.cursor()  # Cria um cursor para executar comandos no banco de dados
    cur.execute("INSERT INTO filmes (nome_filme, genero_filme, ano_filme, imagem_filme) VALUES (%s, %s, %s, %s)", 
                (nome, genero, ano, imagem))  # Insere o novo filme no banco
    mysql.connection.commit()  # Confirma a transação para que os dados sejam salvos no banco
    cur.close()  # Fecha o cursor

    return jsonify({"mensagem": "Dados do filme salvos com sucesso!"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
