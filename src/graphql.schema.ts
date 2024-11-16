
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    name: string;
    password: string;
    account: string;
    desc?: Nullable<string>;
    tel?: Nullable<string>;
}

export class Message {
    expire: string;
    policy: string;
    signature: string;
    accessId: string;
    host: string;
}

export abstract class IMutation {
    abstract sendMessage(tel: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id: string, input: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class OSSParams {
    expire: string;
    policy: string;
    signature: string;
    accessId: string;
    host: string;
}

export abstract class IQuery {
    abstract OSSInfo(): Nullable<OSSParams> | Promise<Nullable<OSSParams>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
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

export type DateTime = Date;
type Nullable<T> = T | null;
