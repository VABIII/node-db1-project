const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = (id) => {
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account);
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async (id) => {
  return db('accounts').where('id', id).del();
}

const checkName = name => {
  return db('accounts').where('name', name).first();
}



module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkName
}
