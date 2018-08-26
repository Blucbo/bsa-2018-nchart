import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http/http.service';
import { ProjectDomainService } from '@app/api/domains/project/project-domain.service';
import { DatasetDomainService } from '@app/api/domains/source/dataset-domain.service';
import { UserDomainService } from '@app/api/domains/user/user.domain';
import { ExportDomainService } from '@app/api/domains/export/export.domain';

@NgModule({
	imports: [HttpClientModule],
	providers: [
		HttpService,
		ProjectDomainService,
		DatasetDomainService,
		UserDomainService,
		ExportDomainService
	]
})
export class APIModule {}
