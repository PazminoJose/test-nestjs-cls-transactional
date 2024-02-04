import { ClsPluginTransactional } from "@nestjs-cls/transactional";
import { TransactionalAdapterPrisma } from "@nestjs-cls/transactional-adapter-prisma";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { ClsModule } from "nestjs-cls";
import { join } from "path";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaClient
          })
        })
      ]
    }),
    MailerModule.forRoot({
      transport: "smtps://user@domain.com:pass@smtp.domain.com",
      template: {
        dir: join(__dirname, "/templates/"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    UserModule
  ],
  providers: [JwtService]
})
export class AppModule {}
