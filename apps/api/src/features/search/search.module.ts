import { Module } from "@nestjs/common";
import { OperatorsModule } from "features/operators/operators.module";
import { SearchController } from "features/search/search.controller";
import { SearchService } from "features/search/search.service";
import { ServicesModule } from "features/services/services.module";

@Module({
  imports: [
    ServicesModule,
    OperatorsModule,
  ],
  controllers: [SearchController],
  exports: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
