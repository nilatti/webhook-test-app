import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createLead(data) {
    //creating the lead happens here; Could involve adding attribute to data to include an event type
    return data;
  }
}
