import { Knex } from 'knex';
import { USERS_TABLE } from '../../constants/database';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    USERS_TABLE,
    (table: Knex.CreateTableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.text('name').notNullable();
      table.text('email').notNullable();
      table.text('password').notNullable();
      table.text('cpf').notNullable();
      table.text('phone').nullable();    
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
      table.unique(['cpf']);
      table.unique(['email']);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(USERS_TABLE);
}
