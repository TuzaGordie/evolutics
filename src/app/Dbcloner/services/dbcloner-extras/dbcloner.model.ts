
export interface IGetDatabases {

      authType: string;
      databaseId: string;
      databaseName: string;
      driver: string;
      password: string;
      port: number;
      schemaName: string;
      server: string;
      tableName: string;
      userName: string
}

export interface IGetTablesFromDestAndSource{
    dbConnectionParamsDest:IGetDatabases;
    dbConnectionParamsSource:IGetDatabases

}

export interface ICopyData{
  destDatabase: string,
  destPassword: string,
  destSchemaName: string,
  destServer: string,
  destTableId: 0,
  destTableName: string,
  destUserName: string,
  destinationColumnName: string,
  destinationDataType: string,
  sourceColumnName: string,
  sourceDataType: string,
  sourceDatabase: string,
  sourcePassword: string,
  sourceSchemaName: string,
  sourceServer: string,
  sourceTableId: 0,
  sourceTableName: string,
  sourceUserName: string

}



