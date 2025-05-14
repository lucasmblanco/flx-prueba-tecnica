import type { Dispatch, SetStateAction } from "react";

export interface User {
	id: string;
	username: string;
	name: string;
	lastname: string;
	status: "active" | "inactive";
}

export interface UsersListContextType {
	usersList?: User[];
	setUsersList: Dispatch<SetStateAction<User[] | []>>;
}

export interface FetchUsersListParams {
	page: number;
	limit: number;
	searchTerm?: string;
	status?: string;
}

interface GetListParams {
	pagination?: {
		page: string | number;
		limit: string | number;
	};
	filters?: {
		[key: string]: string;
	};
	sort?: {
		field: string;
		order: "asc" | "desc";
	};
}

interface GetListResult<T> {
	data: T[];
	total: number;
}

interface GetOneResult<T> {
	data: T;
}

interface CreateResult<T> {
	data: T;
}

interface UpdateResult<T> {
	data: T;
}

type GetListFunction = <T>(
	resource: string,
	params?: GetListParams,
) => Promise<GetListResult<T>>;

type GetOneFunction = <T>(
	resource: string,
	id: string,
) => Promise<GetOneResult<T>>;

type createFunction = <T>(
	resource: string,
	payload: T,
) => Promise<CreateResult<T>>;

type UpdateFunction = <T>(
	resource: string,
	id: string,
	payload: T,
) => Promise<UpdateResult<T>>;

type DeleteFunction = (resource: string, id: string) => Promise<void>;

export interface DataProvider {
	getList: GetListFunction;
	getOne: GetOneFunction;
	create: createFunction;
	update: UpdateFunction;
	delete: DeleteFunction;
}
