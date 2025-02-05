
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Weekday {
    monday = "monday",
    tuesday = "tuesday",
    wednesday = "wednesday",
    thursday = "thursday",
    friday = "friday",
    saturday = "saturday",
    sunday = "sunday"
}

export class PageInput {
    current: number;
    pageSize: number;
}

export class PageCourseInput {
    name?: Nullable<string>;
    pageInput: PageInput;
}

export class OrderTimeInput {
    key?: Nullable<number>;
    startTime?: Nullable<string>;
    endTime?: Nullable<string>;
}

export class ReducibleTimeInput {
    week: Weekday;
    orderTime: OrderTimeInput[];
}

export class MutationCourseInput {
    name: string;
    group: string;
    baseAbility: string;
    limitNumber: number;
    duration: number;
    desc?: Nullable<string>;
    reserveInfo?: Nullable<string>;
    refundInfo?: Nullable<string>;
    otherInfo?: Nullable<string>;
    reducibleTime?: Nullable<ReducibleTimeInput[]>;
}

export class PageOrganizationInput {
    name?: Nullable<string>;
    pageInput: PageInput;
}

export class OrgImageInput {
    url: string;
    remark?: Nullable<string>;
}

export class MutationOrganizationInput {
    name: string;
    businessLicense: string;
    identityCardFrontImg: string;
    identityCardBackImg: string;
    logo: string;
    tel: string;
    address: string;
    tags?: Nullable<string>;
    description?: Nullable<string>;
    longitude?: Nullable<string>;
    latitude?: Nullable<string>;
    frontImages?: Nullable<OrgImageInput[]>;
    roomImages?: Nullable<OrgImageInput[]>;
    otherImages?: Nullable<OrgImageInput[]>;
}

export class PageStudentInput {
    name?: Nullable<string>;
    pageInput: PageInput;
}

export class UserInput {
    name: string;
    password: string;
    tel: string;
    desc?: Nullable<string>;
    account?: Nullable<string>;
}

export class UserUpdateInput {
    name?: Nullable<string>;
    desc?: Nullable<string>;
    avatar?: Nullable<string>;
}

export class PageInfo {
    current: number;
    pageSize: number;
    total: number;
}

export class AuthLogin {
    success: boolean;
    token?: Nullable<string>;
}

export abstract class IMutation {
    abstract sendMessage(tel: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract login(tel: string, code: string): Nullable<AuthLogin> | Promise<Nullable<AuthLogin>>;

    abstract createCourse(input: MutationCourseInput): Nullable<Course> | Promise<Nullable<Course>>;

    abstract updateCourse(id: string, input: MutationCourseInput): Nullable<Course> | Promise<Nullable<Course>>;

    abstract commitCourse(input: MutationCourseInput, id?: Nullable<string>): Nullable<Course> | Promise<Nullable<Course>>;

    abstract removeCourse(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createOrganization(input: MutationOrganizationInput): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract updateOrganization(id: string, input: MutationOrganizationInput): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract commitOrganization(input: MutationOrganizationInput, id?: Nullable<string>): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract removeOrganization(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id: string, input: UserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUserInfo(id: string, input: UserUpdateInput): Nullable<User> | Promise<Nullable<User>>;
}

export class OrderTime {
    key?: Nullable<number>;
    startTime?: Nullable<string>;
    endTime?: Nullable<string>;
}

export class ReducibleTime {
    week: Weekday;
    orderTime: OrderTime[];
}

export class Course {
    id: string;
    createTime: DateTime;
    updateTime: DateTime;
    deletedAt?: Nullable<DateTime>;
    name: string;
    group: string;
    baseAbility: string;
    limitNumber: number;
    duration: number;
    desc?: Nullable<string>;
    reserveInfo?: Nullable<string>;
    refundInfo?: Nullable<string>;
    otherInfo?: Nullable<string>;
    reducibleTime?: Nullable<ReducibleTime[]>;
}

export class PageCourse {
    courses?: Nullable<Course[]>;
    pageInfo: PageInfo;
}

export abstract class IQuery {
    abstract pageCourse(input?: Nullable<PageCourseInput>): Nullable<PageCourse> | Promise<Nullable<PageCourse>>;

    abstract getCourse(id: string): Nullable<Course> | Promise<Nullable<Course>>;

    abstract pageOrganization(input?: Nullable<PageOrganizationInput>): Nullable<PageOrganization> | Promise<Nullable<PageOrganization>>;

    abstract getOrganization(id: string): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract OSSInfo(): Nullable<OSSParams> | Promise<Nullable<OSSParams>>;

    abstract students(input: PageStudentInput): Nullable<Students> | Promise<Nullable<Students>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getUserInfo(): Nullable<User> | Promise<Nullable<User>>;
}

export class OrgImage {
    id: string;
    url: string;
    remark?: Nullable<string>;
}

export class Organization {
    createTime: DateTime;
    updateTime: DateTime;
    id: string;
    businessLicense: string;
    identityCardFrontImg: string;
    identityCardBackImg: string;
    logo: string;
    name: string;
    address: string;
    tel: string;
    tags?: Nullable<string>;
    description?: Nullable<string>;
    longitude?: Nullable<string>;
    latitude?: Nullable<string>;
    frontImages?: Nullable<OrgImage[]>;
    roomImages?: Nullable<OrgImage[]>;
    otherImages?: Nullable<OrgImage[]>;
}

export class PageOrganization {
    organizations?: Nullable<Organization[]>;
    pageInfo: PageInfo;
}

export class OSSParams {
    expire: string;
    policy: string;
    signature: string;
    accessId: string;
    host: string;
    dir: string;
}

export class Student {
    id: string;
    name: string;
    password: string;
    tel: string;
    desc?: Nullable<string>;
    account?: Nullable<string>;
    avatar?: Nullable<string>;
    createTime: DateTime;
    updateTime: DateTime;
}

export class Students {
    students?: Nullable<Nullable<Student>[]>;
    pageInfo?: Nullable<PageInfo>;
}

export class User {
    id: string;
    name: string;
    password: string;
    tel: string;
    desc?: Nullable<string>;
    account?: Nullable<string>;
    avatar?: Nullable<string>;
    createTime: DateTime;
    updateTime: DateTime;
}

export type DateTime = Date;
type Nullable<T> = T | null;
