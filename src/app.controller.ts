import { Get, Controller, Response } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {

  @ApiOperation({ title: 'Redirect the root route to de documentation.'})
  @Get()
  root(@Response() res): string {
    return res.redirect('/api/v1/docs');;
  }
}
