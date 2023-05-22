/* tslint:disable */
/* eslint-disable */
import { MessageReadDto } from './message-read-dto';
import { UserReadDto } from './user-read-dto';
export interface ChatReadDto {
  chatMembers?: null | Array<UserReadDto>;
  chatName?: null | string;
  id?: number;
  locationId?: null | number;
  messages?: null | Array<MessageReadDto>;
}
