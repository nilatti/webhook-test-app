import { Body, Controller, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'; // example here on how to use Auth0 to add JWT auth to an API endpoint: https://auth0.com/blog/developing-a-secure-api-with-nestjs-getting-started/ . 

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/lead')
  createLead(@Body() data) {
    const createdLead = this.appService.createLead(data);
    //possibly the NestJS event emitter is a better way to call this HTTP post
    this.httpService
      .post('https://webhook.site/397c145b-eb5a-42c2-880e-6cddadee56ef', data) //actual subscribable endpoint goes here
      .subscribe({
        complete: () => {
          console.log('completed');
        },
        error: (err) => {
          console.log(err);
        },
      });
    return createdLead;
  }
}
