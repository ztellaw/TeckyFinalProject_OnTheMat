import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('studio', table => {
    table.integer('phone_number', 8).notNullable().alter()
    table.point('latitude').nullable().alter()
    table.point('longitude').nullable().alter()
  })
  await knex.schema.alterTable('payment_record', table => {
    table.decimal('amount').notNullable().alter()
  })

  if (!(await knex.schema.hasTable('user_bookmark'))) {
    await knex.schema.createTable('user_bookmark', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.integer('teacher_id').notNullable()
      table.integer('studio_id').notNullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_bookmark')
  await knex.schema.alterTable('payment_record', table => {
    table.decimal('amount').notNullable().alter()
  })
  await knex.schema.alterTable('studio', table => {
    table.point('longitude').nullable().alter()
    table.point('latitude').nullable().alter()
    table.integer('phone_number').notNullable().alter()
  })
}
