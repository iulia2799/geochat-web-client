/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserReadDto } from '../models/user-read-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiUsersNameNameGet
   */
  static readonly ApiUsersNameNameGetPath = '/api/Users/name/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersNameNameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNameNameGet$Plain$Response(params: {
    name: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserReadDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersNameNameGetPath, 'get');
    if (params) {
      rb.path('name', params.name, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserReadDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsersNameNameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNameNameGet$Plain(params: {
    name: string;
  },
  context?: HttpContext

): Observable<Array<UserReadDto>> {

    return this.apiUsersNameNameGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserReadDto>>) => r.body as Array<UserReadDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersNameNameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNameNameGet$Json$Response(params: {
    name: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserReadDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersNameNameGetPath, 'get');
    if (params) {
      rb.path('name', params.name, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserReadDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUsersNameNameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersNameNameGet$Json(params: {
    name: string;
  },
  context?: HttpContext

): Observable<Array<UserReadDto>> {

    return this.apiUsersNameNameGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserReadDto>>) => r.body as Array<UserReadDto>)
    );
  }

}
