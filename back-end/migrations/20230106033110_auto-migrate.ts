import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.setNullable('first_name')
    table.setNullable('last_name')
    table.setNullable('password')
    table.setNullable('gender')
    table.setNullable('credit')
  })
  await knex.schema.alterTable('studio', table => {
    table.integer('phone_number', 8).notNullable().alter()
    table.point('latitude').nullable().alter()
    table.point('longitude').nullable().alter()
  })
  await knex.schema.alterTable('classes', table => {
    table.setNullable('state')
  })
  await knex.schema.alterTable('user_credit_event', table => {
    table.integer('class_id').unsigned().notNullable().references('classes.id')
  })
  await knex.schema.alterTable('meta_classes', table => {
    table.setNullable('interval')
  })
  await knex.schema.alterTable('studio_reviews', table => {
    table.setNullable('comment')
    table.setNullable('rating')
  })
  await knex.schema.alterTable('payment_record', table => {
    table.decimal('amount').notNullable().alter()
  })
  await knex.schema.alterTable('images', table => {
    table.setNullable('user_id')
    table.setNullable('class_id')
    table.setNullable('studio_id')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('images', table => {
    table.dropNullable('studio_id')
    table.dropNullable('class_id')
    table.dropNullable('user_id')
  })
  await knex.schema.alterTable('payment_record', table => {
    table.decimal('amount').notNullable().alter()
  })
  await knex.schema.alterTable('studio_reviews', table => {
    table.dropNullable('rating')
    table.dropNullable('comment')
  })
  await knex.schema.alterTable('meta_classes', table => {
    table.dropNullable('interval')
  })
  await knex.schema.alterTable('user_credit_event', table => {
    table.dropColumn('class_id')
  })
  await knex.schema.alterTable('classes', table => {
    table.dropNullable('state')
  })
  await knex.schema.alterTable('studio', table => {
    table.point('longitude').nullable().alter()
    table.point('latitude').nullable().alter()
    table.integer('phone_number').notNullable().alter()
  })
  await knex.schema.alterTable('user', table => {
    table.dropNullable('credit')
    table.dropNullable('gender')
    table.dropNullable('password')
    table.dropNullable('last_name')
    table.dropNullable('first_name')
  })
}
