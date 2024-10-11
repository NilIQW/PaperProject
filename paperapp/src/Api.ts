/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateCustomerDTO {
  /** @minLength 1 */
  name: string;
  address?: string | null;
  phone?: string | null;
  /** @format email */
  email?: string | null;
}

export interface CreateOrderDTO {
  /** @format date-time */
  orderDate?: string;
  deliveryDate?: DateOnly;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number;
  orderEntries?: CreateOrderEntryDTO[] | null;
}

export interface CreateOrderEntryDTO {
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
}

export interface CreatePaperDTO {
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  imageUrl?: string | null;
  /** @format int32 */
  sheetsPerPacket?: number;
  properties?: PropertyDTO[] | null;
}

export interface CreatePropertyDTO {
  propertyName?: string | null;
  propertyValue?: string | null;
}

export interface Customer {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string | null;
  /**
   * @minLength 0
   * @maxLength 255
   */
  address?: string | null;
  /**
   * @minLength 0
   * @maxLength 50
   */
  phone?: string | null;
  /**
   * @minLength 0
   * @maxLength 255
   */
  email?: string | null;
  orders?: Order[] | null;
}

export interface CustomerDTO {
  /** @format int32 */
  id?: number;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface DateOnly {
  /** @format int32 */
  year?: number;
  /** @format int32 */
  month?: number;
  /** @format int32 */
  day?: number;
  dayOfWeek?: DayOfWeek;
  /** @format int32 */
  dayOfYear?: number;
  /** @format int32 */
  dayNumber?: number;
}

/** @format int32 */
export enum DayOfWeek {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface Order {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  deliveryDate?: DateOnly;
  /**
   * @minLength 0
   * @maxLength 50
   */
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number;
  customer?: Customer;
  orderEntries?: OrderEntry[] | null;
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  order?: Order;
  product?: Paper;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  /** @format int32 */
  sheetsPerPacket?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  imageUrl?: string | null;
  orderEntries?: OrderEntry[] | null;
  paperProperties?: PaperProperty[] | null;
}

export interface PaperDTO {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  imageUrl?: string | null;
  /** @format int32 */
  sheetsPerPacket?: number;
  properties?: PropertyDTO[] | null;
}

export interface PaperProperty {
  /** @format int32 */
  paperId?: number;
  /** @format int32 */
  propertyId?: number;
  paper?: Paper;
  property?: Property;
}

export interface Property {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 255
   */
  propertyName?: string | null;
  paperProperties?: PaperProperty[] | null;
}

export interface PropertyDTO {
  /** @format int32 */
  id?: number;
  propertyName?: string | null;
}

export interface UpdateCustomerDTO {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  /** @format email */
  email?: string | null;
}

export interface UpdatePaperDTO {
  name?: string | null;
  discontinued?: boolean | null;
  /** @format int32 */
  stock?: number | null;
  /** @format double */
  price?: number | null;
  imageUrl?: string | null;
  /** @format int32 */
  sheetsPerPacket?: number | null;
  properties?: PropertyDTO[] | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title PaperAPI
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerList
     * @request GET:/api/Customer
     */
    customerList: (params: RequestParams = {}) =>
      this.request<CustomerDTO[], any>({
        path: `/api/Customer`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreate
     * @request POST:/api/Customer
     */
    customerCreate: (data: CreateCustomerDTO, params: RequestParams = {}) =>
      this.request<CustomerDTO, any>({
        path: `/api/Customer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerDetail
     * @request GET:/api/Customer/{id}
     */
    customerDetail: (id: number, params: RequestParams = {}) =>
      this.request<CustomerDTO, any>({
        path: `/api/Customer/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerUpdate
     * @request PUT:/api/Customer/{id}
     */
    customerUpdate: (id: number, data: UpdateCustomerDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Customer/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerDelete
     * @request DELETE:/api/Customer/{id}
     */
    customerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Customer/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersList
     * @request GET:/api/Orders
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCreate
     * @request POST:/api/Orders
     */
    ordersCreate: (data: CreateOrderDTO, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/Orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersDetail
     * @request GET:/api/Orders/{id}
     */
    ordersDetail: (id: number, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/Orders/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersUpdate
     * @request PUT:/api/Orders/{id}
     */
    ordersUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Orders/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersSearchList
     * @request GET:/api/Orders/search
     */
    ordersSearchList: (
      query?: {
        query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Order[], any>({
        path: `/api/Orders/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCustomerDetail
     * @request GET:/api/Orders/customer/{customerId}
     */
    ordersCustomerDetail: (customerId: number, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Orders/customer/${customerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperList
     * @request GET:/api/Paper
     */
    paperList: (params: RequestParams = {}) =>
      this.request<PaperDTO[], any>({
        path: `/api/Paper`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreate
     * @request POST:/api/Paper
     */
    paperCreate: (data: CreatePaperDTO, params: RequestParams = {}) =>
      this.request<PaperDTO, any>({
        path: `/api/Paper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperDetail
     * @request GET:/api/Paper/{id}
     */
    paperDetail: (id: number, params: RequestParams = {}) =>
      this.request<PaperDTO, any>({
        path: `/api/Paper/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperUpdate
     * @request PUT:/api/Paper/{id}
     */
    paperUpdate: (id: number, data: UpdatePaperDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Paper/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperDelete
     * @request DELETE:/api/Paper/{id}
     */
    paperDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Paper/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaperProperty
     * @name PaperPropertyDetail
     * @request GET:/api/PaperProperty/{paperId}
     */
    paperPropertyDetail: (paperId: number, params: RequestParams = {}) =>
      this.request<PaperProperty[], any>({
        path: `/api/PaperProperty/${paperId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaperProperty
     * @name PaperPropertyCreate
     * @request POST:/api/PaperProperty
     */
    paperPropertyCreate: (data: PaperProperty, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/PaperProperty`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaperProperty
     * @name PaperPropertyUpdate
     * @request PUT:/api/PaperProperty/{paperId}/{propertyId}
     */
    paperPropertyUpdate: (paperId: number, propertyId: number, data: PaperProperty, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/PaperProperty/${paperId}/${propertyId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PaperProperty
     * @name PaperPropertyDelete
     * @request DELETE:/api/PaperProperty/{paperId}/{propertyId}
     */
    paperPropertyDelete: (paperId: number, propertyId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/PaperProperty/${paperId}/${propertyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyCreate
     * @request POST:/api/Property
     */
    propertyCreate: (data: CreatePropertyDTO, params: RequestParams = {}) =>
      this.request<PropertyDTO, any>({
        path: `/api/Property`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
