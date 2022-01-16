const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts')
}

const getById = async (id) => {
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  const [accountId] = await db('accounts').insert(account);
  console.log(accountId)
  return getById(accountId)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async (id) => {
  return db('accounts').where('id', id).del();
}

const checkName = async () => {
  return db('accounts').where('name', 'Vern');
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkName
}
