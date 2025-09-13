import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

type VerifyVc = {
  vc: string;
};

type IssueVc = {
  issuerPrivateKey: string;
  hodlerAddress: string;
  driverName: string;
  birthDate: string;
  licenseType: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('registerDID')
  async registerDID(): Promise<void> {
    return await this.appService.registerDID();
  }

  @Get('getCurrentDID')
  getCurrentDID(): any {
    return this.appService.getCurrentDID();
  }

  @Get('resolveDID')
  async resolveDID(): Promise<any> {
    return await this.appService.resolveDID();
  }

  @Post('/issueVc')
  async issueVc(@Body() body: IssueVc): Promise<string> {
    return await this.appService.issueVc(
      body.issuerPrivateKey,
      body.hodlerAddress,
      body.driverName,
      body.birthDate,
      body.licenseType,
    );
  }

  @Post('/verifyVc')
  async verifyVc(@Body() body: VerifyVc): Promise<boolean> {
    return await this.appService.verifyVc(body.vc);
  }
}
