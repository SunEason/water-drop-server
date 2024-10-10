
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    name: string;
    password: string;
    account: string;
    desc?: Nullable<string>;
    tel?: Nullable<string>;
}

export class UpdateUserInput {
    id: string;
    name?: Nullable<string>;
    password?: Nullable<string>;
    account?: Nullable<string>;
    desc?: Nullable<string>;
    tel?: Nullable<string>;
}

export class User {
    id: string;
    name: string;
    password: string;
    account: string;
    desc?: Nullable<string>;
    tel?: Nullable<string>;
    createTime: DateTime;
    updateTime: DateTime;
}

export abstract class IQuery {
    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(user: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(user: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
