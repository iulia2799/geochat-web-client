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

import { ChatCreateDto } from '../models/chat-create-dto';
import { ChatReadDto } from '../models/chat-read-dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiChatGet
   */
  static readonly ApiChatGetPath = '/api/Chat';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ChatReadDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.ApiChatGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChatReadDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiChatGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<ChatReadDto>> {

    return this.apiChatGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ChatReadDto>>) => r.body as Array<ChatReadDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ChatReadDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.ApiChatGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ChatReadDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiChatGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiChatGet$Json(params?: {
  },
  context?: HttpContext

): Observable<Array<ChatReadDto>> {

    return this.apiChatGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ChatReadDto>>) => r.body as Array<ChatReadDto>)
    );
  }

  /**
   * Path part for operation apiChatPost
   */
  static readonly ApiChatPostPath = '/api/Chat';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiChatPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatPost$Response(params?: {
    body?: ChatCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ChatService.ApiChatPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiChatPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiChatPost(params?: {
    body?: ChatCreateDto
  },
  context?: HttpContext

): Observable<void> {

    return this.apiChatPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
