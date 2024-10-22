from flask import Flask, jsonify, request  # Importa as funções necessárias do Flask:
# jsonify para enviar respostas em JSON e request para lidar com dados enviados pelo cliente
from flask_cors import CORS  # Importa o CORS para permitir que o frontend faça requisições ao backend
from flask_mysqldb import MySQL  # Importa a biblioteca para integração com o banco de dados MySQL

app = Flask(__name__)  # Cria a aplicação Flask

# Configurações do MySQL
app.config['MYSQL_HOST'] = '127.0.0.1'  # Define o endereço do servidor MySQL (localhost)
app.config['MYSQL_USER'] = 'root'  # Define o usuário do MySQL
app.config['MYSQL_PASSWORD'] = 'teste123'  # Define a senha do usuário do MySQL
app.config['MYSQL_DB'] = 'meu_primeiro_banco'  # D  efine o nome do banco de dados

mysql = MySQL(app)  # Inicializa a conexão MySQL com as configurações acima

CORS(app)  # Habilita CORS para permitir que o frontend faça chamadas ao backend

@app.route('/usuarios', methods=['GET'])  # Define uma rota para o endpoint '/usuarios' usando o método GET
def get_usuarios():
    cur = mysql.connection.cursor()  # Cria um cursor para executar consultas no banco de dados
    cur.execute("SELECT * FROM usuario2")  # Executa a consulta SQL para pegar todos os dados da tabela 'usuario2'
    rows = cur.fetchall()  # Recupera todas as linhas retornadas pela consulta
    cur.close()  # Fecha o cursor

    usuarios = []  # Cria uma lista vazia para armazenar os usuários
    for row in rows:  # Itera sobre cada linha retornada da consulta
        usuarios.append({"id": row[0], "nome": row[1], "email": row[2], "idade": row[3], "cpf": row[4]})  # Adiciona cada usuário como um dicionário à lista

    return jsonify(usuarios)  # Retorna a lista de usuários como JSON

@app.route('/usuarios', methods=['POST'])  # Define uma rota para o endpoint '/usuarios' usando o método POST
def add_usuario():
    data = request.get_json()  # Recebe os dados do usuário enviados pelo frontend no formato JSON
    nome = data['nome']  # Extrai o nome dos dados recebidos
    email = data['email']  # Extrai o email
    idade = data['idade']  # Extrai a idade
    cpf = data['cpf']  # Extrai o CPF

    cur = mysql.connection.cursor()  # Cria um cursor para executar comandos no banco de dados
    cur.execute("INSERT INTO usuario2 (nome, email, idade, cpf) VALUES (%s, %s, %s, %s)", (nome, email, idade, cpf))  # Insere o novo usuário no banco
    mysql.connection.commit()  # Confirma a transação para que os dados sejam salvos no banco
    cur.close()  # Fecha o cursor

    return jsonify({"nome": nome, "email": email, "idade": idade, "cpf": cpf}), 201  # Retorna os dados do usuário recém-adicionado e o status 201 (Criado)

@app.route('/usuarios/<int:id>', methods=['DELETE'])  # Define uma rota para deletar usuários com base no ID
def delete_usuario(id):
    cur = mysql.connection.cursor()  # Cria um cursor para o banco de dados
    cur.execute("DELETE FROM usuario2 WHERE id = %s", (id,))  # Deleta o usuário com o ID fornecido
    mysql.connection.commit()  # Confirma a transação
    cur.close()  # Fecha o cursor
    return jsonify({"message": "Usuário removido com sucesso"}), 200  # Retorna uma mensagem de sucesso e o status 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Inicia o servidor Flask no modo debug na porta 5000
