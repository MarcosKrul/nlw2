import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table=> {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        
        /* relacionamento entre classes; campo user_id faz referencia ao campo
           id da tabela users 
           foreign key 
           onDelete: quando um professor for deleto, todas as aulas que
           ele dava serão apagadas; exclusão em cascata */
        table.integer('user_id')
             .notNullable()
             .references('id')
             .inTable('users')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}

