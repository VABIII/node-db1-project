const db = require('../../data/db-config')


const getAll = async () => {
  return db('accounts')
}

const getById = async (id) => {
  return db('accounts').where('id', id)
}

const create = async (account) => {
  const [accountId] = await db('accounts').insert(account);
  return getById(accountId)
}

const updateById = async (id, account) => {
  await db('account').where('id', id).update(account);
  return getById(id);
}

const deleteById = async (id) => {
  return db('account').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
