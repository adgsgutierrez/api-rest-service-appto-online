export interface IQueryOptions {
    key: string;
    compare: '<' | '<=' | '>' | '>=' | '!=' | '==';
    value: string | number | boolean | Date ;
}