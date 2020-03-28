const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        // limpando o db antes de criar as tabelas
        await connection.migrate.rollback();
        // executando o migrate para criar as tabelas e relacionamentos
        await connection.migrate.latest();
    });

    afterAll(async () => {
        // destruindo a conexão com o db ao final de todos os testes
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Obras Sociais Irmã Dulce",
                email: "carlos.bastos@irmadulce.org.br",
                whatsapp: "75988150000",
                city: "Salvador",
                uf: "BA"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});