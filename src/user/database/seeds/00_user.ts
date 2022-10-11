import { Knex } from 'knex';
import { USERS_TABLE } from '../../constants/database';

export async function seed(knex: Knex): Promise<void> {
  await knex(USERS_TABLE).del();

  await knex(USERS_TABLE).insert([
    {
      id: '80b57002-7076-4fa5-a213-c282710d1aee',
      name: 'cidadao numero um',
      email: 'email1@test.br',
      password: 'l',
      cpf: '20580470016',
      phone: '75996778877',
      created_at:  knex.fn.now(),
      updated_at:  knex.fn.now(),
    },
    {
      id: '09e10123-b9ed-444f-b499-80960c825cb5',
      name: 'cidadao numero dois',
      email: 'email2@test.br',
      password: 'l',
      cpf: '21512117030',
      phone: '91983711649',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 'f0e3a1b3-7dd3-41ce-83c1-392576478371',
      name: 'cidadao numero tres',
      email: 'email3@test.br',
      password: 'l',
      cpf: '63788304014',
      phone: '31985306002',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
