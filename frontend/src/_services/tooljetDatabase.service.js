import HttpClient from '@/_helpers/http-client';

const tooljetAdapter = new HttpClient();

function findOne(headers, tableId, query = '') {
  tooljetAdapter.headers = { ...tooljetAdapter.headers, ...headers };
  return tooljetAdapter.get(`/tooljet-db/proxy/${tableId}?${query}`, headers);
}

function findAll(organizationId) {
  return tooljetAdapter.get(`/tooljet-db/organizations/${organizationId}/tables`);
}

function createTable(organizationId, tableName, columns) {
  return tooljetAdapter.post(`/tooljet-db/organizations/${organizationId}/table`, {
    table_name: tableName,
    columns,
  });
}

function viewTable(organizationId, tableName) {
  return tooljetAdapter.get(`/tooljet-db/organizations/${organizationId}/table/${tableName}`);
}

function bulkUpload(organizationId, tableName, file) {
  return tooljetAdapter.post(`/tooljet-db/organizations/${organizationId}/table/${tableName}/bulk-upload`, file);
}

function createRow(headers, tableId, data) {
  return tooljetAdapter.post(`/tooljet-db/proxy/${tableId}`, data, headers);
}

function createColumn(organizationId, tableId, columnName, dataType, defaultValue, isNotNull) {
  return tooljetAdapter.post(`/tooljet-db/organizations/${organizationId}/table/${tableId}/column`, {
    column: {
      column_name: columnName,
      data_type: dataType,
      column_default: defaultValue,
      constraints_type: {
        is_not_null: isNotNull,
      },
    },
  });
}

function updateTable(organizationId, tableName, columns) {
  return tooljetAdapter.patch(`/tooljet-db/${organizationId}/perform`, {
    action: 'update_table',
    table_name: tableName,
    columns,
  });
}

function renameTable(organizationId, tableName, newTableName) {
  return tooljetAdapter.patch(`/tooljet-db/organizations/${organizationId}/table/${tableName}`, {
    action: 'rename_table',
    table_name: tableName,
    new_table_name: newTableName,
  });
}

function updateRows(headers, tableId, data, query = '') {
  return tooljetAdapter.patch(`/tooljet-db/proxy/${tableId}?${query}`, data, headers);
}

function updateColumn(organizationId, tableName, columns) {
  return tooljetAdapter.patch(
    `/tooljet-db/organizations/${organizationId}/table/${tableName}/column`,
    columns,
    organizationId
  );
}

function deleteRows(headers, tableId, query = '') {
  return tooljetAdapter.delete(`/tooljet-db/proxy/${tableId}?${query}`, headers);
}

function deleteColumn(organizationId, tableName, columnName) {
  return tooljetAdapter.delete(`/tooljet-db/organizations/${organizationId}/table/${tableName}/column/${columnName}`);
}

function deleteTable(organizationId, tableName) {
  return tooljetAdapter.delete(`/tooljet-db/organizations/${organizationId}/table/${tableName}`);
}

function joinTables(organizationId, data) {
  return tooljetAdapter.post(`tooljet-db/organizations/${organizationId}/join`, data);
}

export const tooljetDatabaseService = {
  findOne,
  findAll,
  viewTable,
  createRow,
  createTable,
  createColumn,
  updateTable,
  updateRows,
  deleteRows,
  deleteColumn,
  deleteTable,
  renameTable,
  bulkUpload,
  joinTables,
  updateColumn,
};
